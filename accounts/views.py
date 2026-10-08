import secrets

from datetime import timedelta
from django.conf import settings
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OTPVerification
from .serializers import (
    RegisterSerializer,
    SendOTPSerializer,
    VerifyOTPSerializer,
)
from .sms import (
    SMSProviderError,
    check_verification,
    is_twilio_enabled,
    send_verification,
)


class DemoLoginThrottle(AnonRateThrottle):
    scope = "demo_login"


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
            phone_number = f"+91{mobile}"

            if is_twilio_enabled():
                try:
                    send_verification(phone_number)
                except SMSProviderError:
                    return Response(
                        {"message": "Unable to send the OTP right now. Please try again later."},
                        status=status.HTTP_503_SERVICE_UNAVAILABLE,
                    )
                return Response(
                    {"message": "OTP sent successfully.", "mobile": mobile},
                    status=status.HTTP_200_OK,
                )

            if not settings.DEBUG:
                return Response(
                    {"message": "SMS delivery is not configured for this deployment."},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE,
                )

            latest = OTPVerification.objects.filter(
                mobile=mobile, is_verified=False
            ).order_by("-created_at").first()
            if latest and timezone.now() - latest.created_at < timedelta(seconds=30):
                return Response(
                    {"message": "Please wait 30 seconds before requesting another OTP."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )

            OTPVerification.objects.filter(mobile=mobile, is_verified=False).delete()
            otp = f"{secrets.randbelow(1_000_000):06d}"
            OTPVerification.objects.create(mobile=mobile, otp=otp)
            return Response(
                {"message": "Development OTP generated.", "mobile": mobile, "otp": otp},
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

            if is_twilio_enabled():
                try:
                    is_valid = check_verification(f"+91{mobile}", otp)
                except SMSProviderError:
                    return Response(
                        {"message": "Unable to verify the OTP right now. Please try again."},
                        status=status.HTTP_503_SERVICE_UNAVAILABLE,
                    )
                verification = None
            else:
                verification = OTPVerification.objects.filter(
                    mobile=mobile,
                    is_verified=False,
                ).order_by("-created_at").first()
                is_valid = bool(
                    verification
                    and verification.attempts < 5
                    and timezone.now() - verification.created_at <= timedelta(minutes=5)
                    and secrets.compare_digest(verification.otp, otp)
                )

            if not is_valid:
                if verification and not is_twilio_enabled():
                    verification.attempts += 1
                    if verification.attempts >= 5:
                        verification.is_verified = True
                    verification.save(update_fields=["attempts", "is_verified"])
                return Response(
                    {
                        "message": "Invalid OTP."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if verification:
                verification.is_verified = True
                verification.save(update_fields=["is_verified"])

            user = User.objects.filter(
                mobile=mobile
            ).first()

            if not user:
                # First-time OTP users are registered as sellers.
                user = User.objects.create_user(
                    username=mobile,
                    mobile=mobile,
                    password=None,
                    role="seller",
                    is_mobile_verified=True,
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


class DemoLoginView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [DemoLoginThrottle]

    def post(self, request):
        if not settings.DEMO_MODE:
            return Response(
                {"message": "Demo login is disabled."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Each browser gets a new synthetic seller, so demo visitors cannot see
        # another visitor's requests. No phone verification is implied.
        demo_id = secrets.token_hex(5)
        username = f"demo_{demo_id}"
        mobile = f"demo-{demo_id}"
        user = User.objects.create_user(
            username=username,
            mobile=mobile,
            password=secrets.token_urlsafe(32),
            role="seller",
            is_mobile_verified=False,
        )
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Demo account created. This account has no verified mobile number.",
                "user_id": user.id,
                "mobile": mobile,
                "role": user.role,
                "demo_mode": True,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )
