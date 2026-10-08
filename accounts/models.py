from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ('seller', 'Seller'),
        ('employee', 'Employee'),
        ('admin', 'Admin'),
    )

    mobile = models.CharField(max_length=15, unique=True)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='seller'
    )

    is_mobile_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} - {self.role}"


class OTPVerification(models.Model):
    mobile = models.CharField(max_length=15)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.mobile} - {self.otp}"