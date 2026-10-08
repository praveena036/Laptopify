from django.db import models
from accounts.models import User


class LaptopRequest(models.Model):

    CONDITION_CHOICES = (
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('average', 'Average'),
        ('needs_repair', 'Needs Repair'),
    )

    STATUS_CHOICES = (
        ('submitted', 'Submitted'),
        ('kyc_verification', 'KYC Verification'),
        ('inspection_pending', 'Inspection Pending'),
        ('inspector_assigned', 'Inspector Assigned'),
        ('inspection_completed', 'Inspection Completed'),
        ('valuation_pending', 'Valuation Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('purchase_processing', 'Purchase Processing'),
        ('purchase_completed', 'Purchase Completed'),
        ('cancelled', 'Cancelled'),
    )

    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='laptop_requests',
        limit_choices_to={'role': 'seller'}
    )

    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    processor = models.CharField(max_length=150)
    ram = models.CharField(max_length=50)
    storage = models.CharField(max_length=100)
    operating_system = models.CharField(max_length=100)

    purchase_year = models.PositiveIntegerField()

    original_purchase_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    expected_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    condition = models.CharField(
        max_length=30,
        choices=CONDITION_CHOICES
    )

    reason_for_selling = models.TextField()

    status = models.CharField(
        max_length=40,
        choices=STATUS_CHOICES,
        default='submitted'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.model} - {self.seller.username}"