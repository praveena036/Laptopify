import re

from rest_framework import serializers
from .models import User, OTPVerification


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'password',
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email', ''),
            mobile=validated_data['mobile'],
            password=validated_data['password'],
            role='seller',
            is_mobile_verified=False,
        )

        return user


class SendOTPSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)

    def validate_mobile(self, value):
        if not re.fullmatch(r"\+?[\d\s()-]+", value.strip()):
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        digits = "".join(character for character in value if character.isdigit())
        if digits.startswith("91") and len(digits) == 12:
            digits = digits[2:]
        if len(digits) != 10 or digits[0] not in "6789":
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        return digits


class VerifyOTPSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=6, min_length=6)

    def validate_otp(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Enter the 6-digit OTP.")
        return value

    def validate_mobile(self, value):
        if not re.fullmatch(r"\+?[\d\s()-]+", value.strip()):
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        digits = "".join(character for character in value if character.isdigit())
        if digits.startswith("91") and len(digits) == 12:
            digits = digits[2:]
        if len(digits) != 10 or digits[0] not in "6789":
            raise serializers.ValidationError("Enter a valid 10-digit Indian mobile number.")
        return digits
