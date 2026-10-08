import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OTPVerification
from .serializers import (
    RegisterSerializer,
    SendOTPSerializer,
    VerifyOTPSerializer,
)


class RegisterView(APIView):

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "Registration successful. Please verify your mobile number.",
                    "user_id": user.id,
                    "mobile": user.mobile,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class SendOTPView(APIView):

    def post(self, request):
        serializer = SendOTPSerializer(data=request.data)

        if serializer.is_valid():
            mobile = serializer.validated_data["mobile"]

            otp = str(random.randint(100000, 999999))

            OTPVerification.objects.filter(
                mobile=mobile,
                is_verified=False
            ).delete()

            OTPVerification.objects.create(
                mobile=mobile,
                otp=otp,
            )

            # Development testing only.
            # Real SMS provider will be connected before deployment.
            return Response(
                {
                    "message": "OTP generated successfully.",
                    "mobile": mobile,
                    "otp": otp,
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class VerifyOTPView(APIView):

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)

        if serializer.is_valid():
            mobile = serializer.validated_data["mobile"]
            otp = serializer.validated_data["otp"]

            verification = OTPVerification.objects.filter(
                mobile=mobile,
                otp=otp,
                is_verified=False
            ).order_by("-created_at").first()

            if not verification:
                return Response(
                    {
                        "message": "Invalid OTP."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            verification.is_verified = True
            verification.save()

            user = User.objects.filter(
                mobile=mobile
            ).first()

            if not user:
                return Response(
                    {
                        "message": "User not found."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )

            user.is_mobile_verified = True
            user.save(update_fields=["is_mobile_verified"])

            # Create JWT tokens after successful OTP verification
            refresh = RefreshToken.for_user(user)

            return Response(
                {
                    "message": "Mobile number verified successfully.",
                    "user_id": user.id,
                    "mobile": user.mobile,
                    "role": user.role,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )