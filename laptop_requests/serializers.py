from rest_framework import serializers
from django.utils import timezone
from .models import LaptopRequest


class LaptopRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = LaptopRequest

        fields = [
            "id",
            "seller",
            "brand",
            "model",
            "processor",
            "ram",
            "storage",
            "operating_system",
            "purchase_year",
            "original_purchase_price",
            "expected_price",
            "condition",
            "reason_for_selling",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "seller",
            "status",
            "created_at",
            "updated_at",
        ]

    def validate_expected_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Expected price must be greater than 0."
            )

        return value

    def validate_original_purchase_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Original purchase price must be greater than 0."
            )

        return value

    def validate_purchase_year(self, value):
        if value < 2000 or value > timezone.now().year:
            raise serializers.ValidationError(
                "Please enter a valid purchase year."
            )

        return value

    def validate(self, data):
        original_price = data.get("original_purchase_price")
        expected_price = data.get("expected_price")

        if (
            original_price is not None
            and expected_price is not None
            and expected_price > original_price
        ):
            raise serializers.ValidationError(
                {
                    "expected_price": (
                        "Expected price cannot be greater "
                        "than original purchase price."
                    )
                }
            )

        return data
