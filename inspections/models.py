from django.db import models
from laptop_requests.models import LaptopRequest


class Inspection(models.Model):

    laptop_request = models.OneToOneField(
        LaptopRequest,
        on_delete=models.CASCADE,
        related_name="inspection"
    )

    physical_condition = models.CharField(max_length=100)
    screen_condition = models.CharField(max_length=100)
    keyboard_condition = models.CharField(max_length=100)
    battery_condition = models.CharField(max_length=100)
    charger_condition = models.CharField(max_length=100)
    camera_condition = models.CharField(max_length=100)
    speaker_condition = models.CharField(max_length=100)
    ports_condition = models.CharField(max_length=100)

    processor_verified = models.BooleanField(default=False)
    ram_verified = models.BooleanField(default=False)
    storage_verified = models.BooleanField(default=False)

    overall_condition = models.CharField(max_length=50)

    remarks = models.TextField(blank=True)

    suggested_value = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True
    )

    inspection_status = models.CharField(
        max_length=30,
        default="completed"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inspection - {self.laptop_request}"