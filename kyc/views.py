from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import KYCDocument
from accounts.models import User
from laptop_requests.models import LaptopRequest


class KYCSubmitView(APIView):

    def post(self, request):

        seller_id = request.data.get("seller_id")
        laptop_request_id = request.data.get("laptop_request_id")

        identity_proof = request.FILES.get("identity_proof")
        address_proof = request.FILES.get("address_proof")
        additional_document = request.FILES.get("additional_document")

        if not seller_id:
            return Response(
                {"message": "Seller ID is required."},
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

        seller = User.objects.filter(
            id=seller_id,
            role="seller"
        ).first()

        if not seller:
            return Response(
                {"message": "Seller not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        laptop_request = None

        if laptop_request_id:
            laptop_request = LaptopRequest.objects.filter(
                id=laptop_request_id,
                seller=seller
            ).first()

        kyc = KYCDocument.objects.create(
            seller=seller,
            laptop_request=laptop_request,
            identity_proof=identity_proof,
            address_proof=address_proof,
            additional_document=additional_document,
            status="under_verification"
        )

        return Response(
            {
                "message": "KYC submitted successfully.",
                "kyc_id": kyc.id,
                "status": kyc.status,
            },
            status=status.HTTP_201_CREATED
        )