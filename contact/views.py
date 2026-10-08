from rest_framework import generics
from django.conf import settings
from django.core.mail import send_mail

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact = serializer.save()

        subject = f"Laptopify Contact: {contact.subject}"

        message = f"""
New Contact Message

Name: {contact.name}
Email: {contact.email}
Mobile: {contact.mobile}
Subject: {contact.subject}

Message:
{contact.message}
"""

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )