from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import KYCDocument
from laptop_requests.models import LaptopRequest


class KYCSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        laptop_request_id = request.data.get("laptop_request_id")

        identity_proof = request.FILES.get("identity_proof")
        address_proof = request.FILES.get("address_proof")
        additional_document = request.FILES.get("additional_document")
        full_name = (request.data.get("full_name") or "").strip()
        address = (request.data.get("address") or "").strip()

        if not full_name or not address:
            return Response(
                {"message": "Full name and address are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not identity_proof:
            return Response(
                {"message": "Identity proof is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not address_proof:
            return Response(
                {"message": "Address proof is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        seller = request.user if request.user.role == "seller" else None

        if not seller:
            return Response(
                {"message": "Seller not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if not laptop_request_id:
            return Response(
                {"message": "Submit laptop details before completing KYC."},
                status=status.HTTP_400_BAD_REQUEST
            )

        laptop_request = None

        if laptop_request_id:
            laptop_request = LaptopRequest.objects.filter(
                id=laptop_request_id,
                seller=seller
            ).first()
            if not laptop_request:
                return Response(
                    {"message": "Laptop request not found for this account."},
                    status=status.HTTP_404_NOT_FOUND
                )

        kyc = KYCDocument.objects.create(
            seller=seller,
            laptop_request=laptop_request,
            full_name=full_name,
            address=address,
            identity_proof=identity_proof,
            address_proof=address_proof,
            additional_document=additional_document,
            status="under_verification"
        )

        if laptop_request:
            laptop_request.status = "kyc_verification"
            laptop_request.save(update_fields=["status", "updated_at"])

        return Response(
            {
                "message": "KYC submitted successfully.",
                "kyc_id": kyc.id,
                "status": kyc.status,
                "request_status": laptop_request.status,
            },
            status=status.HTTP_201_CREATED
        )
