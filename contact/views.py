from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from django.db import transaction

from .email import ContactEmailError, send_contact_email
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            # Save only after the email provider accepts the message so a failed
            # submission doesn't look successful or leave an unsent enquiry.
            with transaction.atomic():
                contact = serializer.save()
                send_contact_email(serializer.validated_data)
        except ContactEmailError:
            return Response(
                {"message": "We couldn't send your message right now. Please try again shortly."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
