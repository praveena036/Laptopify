from django.contrib import admin
from .models import Purchase


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = (
        "laptop_request",
        "purchase_value",
        "payment_status",
        "status",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "status",
    )

    search_fields = (
        "laptop_request__brand",
        "laptop_request__model",
        "laptop_request__seller__full_name",
    )