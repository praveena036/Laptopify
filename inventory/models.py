from django.db import models
from purchases.models import Purchase


class Inventory(models.Model):

    STATUS_CHOICES = [
        ("available", "Available"),
        ("maintenance", "Under Maintenance"),
        ("assigned", "Assigned"),
        ("sold", "Sold"),
    ]

    purchase = models.OneToOneField(
        Purchase,
        on_delete=models.CASCADE,
        related_name="inventory"
    )

    laptop_id = models.CharField(max_length=100, unique=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    serial_number = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=True
    )

    processor = models.CharField(max_length=150)
    ram = models.CharField(max_length=50)
    storage = models.CharField(max_length=100)

    purchase_value = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    purchase_date = models.DateField()

    condition = models.CharField(max_length=50)

    current_status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="available"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.laptop_id} - {self.brand} {self.model}"