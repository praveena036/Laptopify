from django.contrib import admin
from .models import Inventory


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):

    list_display = (
        "laptop_id",
        "brand",
        "model",
        "serial_number",
        "purchase_value",
        "purchase_date",
        "condition",
        "current_status",
        "created_at",
    )

    list_filter = (
        "brand",
        "condition",
        "current_status",
    )

    search_fields = (
        "laptop_id",
        "brand",
        "model",
        "serial_number",
    )

    ordering = ("-created_at",)