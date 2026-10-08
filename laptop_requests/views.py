from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from kyc.models import KYCDocument
from inspections.models import Inspection
from purchases.models import Purchase
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from valuations.models import Valuation

from .models import LaptopRequest
from .serializers import LaptopRequestSerializer


class LaptopRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = LaptopRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return LaptopRequest.objects.all().order_by("-created_at")

        if user.role == "seller":
            return LaptopRequest.objects.filter(
                seller=user
            ).order_by("-created_at")

        return LaptopRequest.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "seller":
            raise PermissionDenied(
                "Only sellers can submit laptop requests."
            )

        serializer.save(
            seller=user,
            status="submitted"
        )


class LaptopRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LaptopRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return LaptopRequest.objects.all()

        if user.role == "seller":
            return LaptopRequest.objects.filter(seller=user)

        return LaptopRequest.objects.none()

    def perform_update(self, serializer):
        laptop_request = serializer.instance
        if laptop_request.offer_decision != "pending" or Purchase.objects.filter(laptop_request=laptop_request).exists():
            raise ValidationError("This request is finalized and can no longer be edited.")

        changed_device_details = any(
            getattr(laptop_request, field) != value
            for field, value in serializer.validated_data.items()
        )
        serializer.save()

        if changed_device_details:
            Inspection.objects.filter(laptop_request=laptop_request).delete()
            Valuation.objects.filter(laptop_request=laptop_request).delete()
            latest_kyc = KYCDocument.objects.filter(
                laptop_request=laptop_request
            ).order_by("-created_at").first()
            laptop_request.status = (
                "inspection_pending" if latest_kyc and latest_kyc.status == "verified"
                else "kyc_verification" if latest_kyc
                else "submitted"
            )
            laptop_request.save(update_fields=["status", "updated_at"])


class LaptopRequestWorkflowView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        laptop_request = get_object_or_404(
            LaptopRequest.objects.select_related("seller"),
            pk=pk,
            seller=request.user,
        )
        kyc = KYCDocument.objects.filter(
            laptop_request=laptop_request, seller=request.user
        ).order_by("-created_at").first()
        inspection = Inspection.objects.filter(laptop_request=laptop_request).first()
        valuation = Valuation.objects.filter(laptop_request=laptop_request).first()
        purchase = Purchase.objects.filter(laptop_request=laptop_request).first()

        return Response({
            "laptop_request": LaptopRequestSerializer(laptop_request).data,
            "kyc": {
                "status": kyc.status,
                "full_name": kyc.full_name,
                "address": kyc.address,
                "admin_remarks": kyc.admin_remarks,
            } if kyc else None,
            "inspection": {
                "status": inspection.inspection_status,
                "overall_condition": inspection.overall_condition,
                "physical_condition": inspection.physical_condition,
                "screen_condition": inspection.screen_condition,
                "keyboard_condition": inspection.keyboard_condition,
                "battery_condition": inspection.battery_condition,
                "charger_condition": inspection.charger_condition,
                "camera_condition": inspection.camera_condition,
                "speaker_condition": inspection.speaker_condition,
                "ports_condition": inspection.ports_condition,
                "processor_verified": inspection.processor_verified,
                "ram_verified": inspection.ram_verified,
                "storage_verified": inspection.storage_verified,
                "remarks": inspection.remarks,
            } if inspection else None,
            "valuation": {
                "estimated_value": str(valuation.approved_value or valuation.inspector_value),
                "status": valuation.status,
                "is_provisional": valuation.approved_value is None,
            } if valuation else None,
            "purchase": {
                "id": purchase.id,
                "status": purchase.status,
                "payment_status": purchase.payment_status,
                "amount": str(purchase.purchase_value),
            } if purchase else None,
            # A purchase record is authoritative for older requests created before
            # the decision field was introduced.
            "offer_decision": "accepted" if purchase else laptop_request.offer_decision,
        })
