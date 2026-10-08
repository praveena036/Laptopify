from django.contrib import admin
from .models import Seller


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "mobile",
        "city",
        "state",
        "kyc_status",
        "created_at",
    )

    list_filter = (
        "kyc_status",
        "state",
        "city",
    )

    search_fields = (
        "full_name",
        "mobile",
        "city",
    )