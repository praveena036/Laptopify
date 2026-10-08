from django.db import models
from laptop_requests.models import LaptopRequest


class Purchase(models.Model):

    STATUS_CHOICES = [
        ("approved", "Approved"),
        ("purchase_processing", "Purchase Processing"),
        ("payment_pending", "Payment Pending"),
        ("payment_completed", "Payment Completed"),
        ("purchase_completed", "Purchase Completed"),
    ]

    laptop_request = models.OneToOneField(
        LaptopRequest,
        on_delete=models.CASCADE,
        related_name="purchase"
    )

    purchase_value = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    purchase_date = models.DateField(
        null=True,
        blank=True
    )

    payment_status = models.CharField(
        max_length=30,
        default="pending"
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="approved"
    )

    remarks = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Purchase - {self.laptop_request}"