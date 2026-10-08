from django.db import models
from accounts.models import User


class Seller(models.Model):

    KYC_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("under_verification", "Under Verification"),
        ("verified", "Verified"),
        ("rejected", "Rejected"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="seller_profile"
    )

    full_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=15)

    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    kyc_status = models.CharField(
        max_length=30,
        choices=KYC_STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name