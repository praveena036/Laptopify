from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from kyc.models import KYCDocument
from inspections.models import Inspection
from laptop_requests.models import LaptopRequest
from valuations.models import Valuation

from .models import Purchase


class AcceptBuybackOfferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, laptop_request_id):
        laptop_request = get_object_or_404(
            LaptopRequest, id=laptop_request_id, seller=request.user
        )
        if laptop_request.offer_decision == "rejected":
            return Response(
                {"message": "This buyback offer has already been declined."},
                status=status.HTTP_409_CONFLICT,
            )
        kyc = KYCDocument.objects.filter(
            laptop_request=laptop_request, seller=request.user
        ).order_by("-created_at").first()
        if not kyc or kyc.status != "verified":
            return Response(
                {"message": "Laptopify must verify your KYC documents before accepting a buyback offer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not Inspection.objects.filter(laptop_request=laptop_request).exists():
            return Response(
                {"message": "Submit the laptop condition checklist before accepting a buyback offer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        valuation = Valuation.objects.filter(laptop_request=laptop_request).first()
        if not valuation or valuation.status == "rejected":
            return Response(
                {"message": "A valid Laptopify valuation is required before acceptance."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        amount = valuation.approved_value or valuation.inspector_value
        if amount is None:
            return Response(
                {"message": "The Laptopify team is still reviewing your valuation."},
                status=status.HTTP_409_CONFLICT,
            )

        with transaction.atomic():
            purchase, created = Purchase.objects.get_or_create(
                laptop_request=laptop_request,
                defaults={
                    "purchase_value": amount,
                    "status": "purchase_processing",
                    "payment_status": "pending",
                    "remarks": "Seller accepted the provisional buyback offer.",
                },
            )
            if created:
                laptop_request.status = "purchase_processing"
            laptop_request.offer_decision = "accepted"
            laptop_request.save(update_fields=["status", "offer_decision", "updated_at"])

        return Response(
            {
                "id": purchase.id,
                "amount": str(purchase.purchase_value),
                "status": purchase.status,
                "payment_status": purchase.payment_status,
                "decision": laptop_request.offer_decision,
                "message": "Offer accepted. Laptopify will contact you to arrange collection and payment.",
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class RejectBuybackOfferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, laptop_request_id):
        laptop_request = get_object_or_404(
            LaptopRequest, id=laptop_request_id, seller=request.user
        )
        if Purchase.objects.filter(laptop_request=laptop_request).exists() or laptop_request.offer_decision == "accepted":
            return Response(
                {"message": "An accepted buyback request cannot be declined."},
                status=status.HTTP_409_CONFLICT,
            )
        kyc = KYCDocument.objects.filter(
            laptop_request=laptop_request, seller=request.user
        ).order_by("-created_at").first()
        if not kyc or kyc.status != "verified":
            return Response(
                {"message": "Laptopify must verify your KYC documents before you can decline an offer."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not Inspection.objects.filter(laptop_request=laptop_request).exists():
            return Response(
                {"message": "Submit the laptop condition checklist before declining an offer."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        valuation = Valuation.objects.filter(laptop_request=laptop_request).first()
        if not valuation or valuation.status == "rejected" or (valuation.approved_value is None and valuation.inspector_value is None):
            return Response(
                {"message": "A valid Laptopify valuation is required before declining the offer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        laptop_request.offer_decision = "rejected"
        laptop_request.status = "cancelled"
        laptop_request.save(update_fields=["offer_decision", "status", "updated_at"])
        return Response({
            "decision": laptop_request.offer_decision,
            "status": laptop_request.status,
            "message": "You declined this Laptopify offer. No purchase was created.",
        }, status=status.HTTP_200_OK)
