from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "mobile",
        "subject",
        "is_read",
        "created_at",
    )

    list_filter = (
        "subject",
        "is_read",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "mobile",
        "message",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
    )