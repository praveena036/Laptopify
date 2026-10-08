from django.contrib import admin
from .models import Valuation


@admin.register(Valuation)
class ValuationAdmin(admin.ModelAdmin):
    list_display = (
        "laptop_request",
        "inspector_value",
        "approved_value",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "laptop_request__brand",
        "laptop_request__model",
        "laptop_request__seller__full_name",
    )