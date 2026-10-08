from django.db import models
from accounts.models import User
from laptop_requests.models import LaptopRequest


class KYCDocument(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("under_verification", "Under Verification"),
        ("verified", "Verified"),
        ("rejected", "Rejected"),
    ]

    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="kyc_documents",
        limit_choices_to={"role": "seller"}
    )

    laptop_request = models.ForeignKey(
        LaptopRequest,
        on_delete=models.CASCADE,
        related_name="kyc_documents",
        null=True,
        blank=True
    )

    identity_proof = models.FileField(
        upload_to="kyc/identity/"
    )

    address_proof = models.FileField(
        upload_to="kyc/address/"
    )

    additional_document = models.FileField(
        upload_to="kyc/additional/",
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="pending"
    )

    admin_remarks = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"KYC - {self.seller.username}"