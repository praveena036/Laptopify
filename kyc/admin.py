from django.contrib import admin
from .models import KYCDocument


@admin.register(KYCDocument)
class KYCDocumentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "seller",
        "laptop_request",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "seller__username",
        "seller__mobile",
        "laptop_request__brand",
        "laptop_request__model",
    )

    ordering = ("-created_at",)