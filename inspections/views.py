from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from kyc.models import KYCDocument
from laptop_requests.models import LaptopRequest
from purchases.models import Purchase
from valuations.models import Valuation
from valuations.services import estimate_buyback_value

from .models import Inspection
from .serializers import InspectionSubmissionSerializer


def inspection_data(inspection):
    fields = (
        "id", "physical_condition", "screen_condition", "keyboard_condition",
        "battery_condition", "charger_condition", "camera_condition",
        "speaker_condition", "ports_condition", "processor_verified",
        "ram_verified", "storage_verified", "overall_condition", "remarks",
        "inspection_status", "created_at",
    )
    return {field: getattr(inspection, field) for field in fields}


class SellerInspectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, laptop_request_id):
        laptop_request = get_object_or_404(
            LaptopRequest, id=laptop_request_id, seller=request.user
        )
        if not KYCDocument.objects.filter(
            laptop_request=laptop_request, seller=request.user
        ).exists():
            return Response(
                {"message": "Submit your identity and address documents before the inspection."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if Purchase.objects.filter(laptop_request=laptop_request).exists():
            return Response(
                {"message": "This laptop request is already in purchase processing."},
                status=status.HTTP_409_CONFLICT,
            )

        serializer = InspectionSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            inspection, _ = Inspection.objects.update_or_create(
                laptop_request=laptop_request,
                defaults={
                    **serializer.validated_data,
                    "inspection_status": "seller_submitted",
                },
            )
            estimate = estimate_buyback_value(laptop_request, inspection)
            valuation, _ = Valuation.objects.update_or_create(
                laptop_request=laptop_request,
                defaults={"inspector_value": estimate, "status": "pending"},
            )
            inspection.suggested_value = estimate
            inspection.save(update_fields=["suggested_value", "updated_at"])
            laptop_request.status = "inspection_pending"
            laptop_request.save(update_fields=["status", "updated_at"])

        return Response(
            {
                "inspection": inspection_data(inspection),
                "valuation": {
                    "estimated_value": str(valuation.inspector_value),
                    "status": valuation.status,
                    "is_provisional": True,
                },
                "request_status": laptop_request.status,
            },
            status=status.HTTP_200_OK,
        )
