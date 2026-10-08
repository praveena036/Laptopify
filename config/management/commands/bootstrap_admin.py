import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create the initial Django admin from private deployment environment variables."

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_ADMIN_USERNAME", "").strip()
        email = os.getenv("DJANGO_ADMIN_EMAIL", "").strip()
        password = os.getenv("DJANGO_ADMIN_PASSWORD", "")
        if not all((username, email, password)):
            self.stdout.write("Admin bootstrap skipped; admin environment variables are not configured.")
            return

        user_model = get_user_model()
        if user_model.objects.filter(is_superuser=True).exists():
            self.stdout.write("An admin account already exists; no changes made.")
            return

        if len(password) < 12:
            raise CommandError("DJANGO_ADMIN_PASSWORD must be at least 12 characters.")

        # This account is only for staff administration; it is not an OTP login.
        user_model.objects.create_superuser(
            username=username,
            email=email,
            password=password,
            mobile=f"admin-{username}"[:15],
            role="admin",
        )
        self.stdout.write(self.style.SUCCESS("Initial admin account created."))
