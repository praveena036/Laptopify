from django.contrib import admin
from .models import Inspection


@admin.register(Inspection)
class InspectionAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "laptop_request",
        "overall_condition",
        "suggested_value",
        "inspection_status",
        "created_at",
    )

    list_filter = (
        "overall_condition",
        "inspection_status",
    )

    search_fields = (
        "laptop_request__brand",
        "laptop_request__model",
        "laptop_request__seller__full_name",
    )