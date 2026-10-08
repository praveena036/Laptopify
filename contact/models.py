from django.db import models


class ContactMessage(models.Model):

    SUBJECT_CHOICES = [
        ("Laptop Selling", "Laptop Selling"),
        ("KYC Verification", "KYC Verification"),
        ("Inspection", "Laptop Inspection"),
        ("Valuation", "Valuation"),
        ("Purchase Status", "Purchase Status"),
        ("Other", "Other Enquiry"),
    ]

    name = models.CharField(max_length=150)

    email = models.EmailField()

    mobile = models.CharField(
        max_length=15,
        blank=True
    )

    subject = models.CharField(
        max_length=100,
        choices=SUBJECT_CHOICES
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    is_read = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"{self.name} - {self.subject}"