"""Deliver contact form submissions through the configured email API."""

import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.mail import EmailMessage


logger = logging.getLogger(__name__)


class ContactEmailError(Exception):
    """Raised when the contact email cannot be delivered."""


def send_contact_email(contact):
    message = (
        "A new message was submitted through the Laptopify contact form.\n\n"
        f"Name: {contact['name']}\n"
        f"Email: {contact['email']}\n"
        f"Mobile: {contact.get('mobile') or 'Not provided'}\n"
        f"Subject: {contact['subject']}\n\n"
        "Message:\n"
        f"{contact['message']}\n"
    )
    subject = f"Laptopify contact: {contact['subject']}"

    if settings.EMAIL_PROVIDER == "smtp":
        if not all((settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD,
                    settings.CONTACT_EMAIL_FROM, settings.CONTACT_EMAIL_TO)):
            logger.error("Contact SMTP delivery is missing server configuration.")
            raise ContactEmailError("Contact email is not configured.")
        try:
            email = EmailMessage(
                subject=subject,
                body=message,
                from_email=settings.CONTACT_EMAIL_FROM,
                to=[settings.CONTACT_EMAIL_TO],
                reply_to=[contact["email"]],
            )
            if email.send(fail_silently=False) != 1:
                raise ContactEmailError("SMTP did not accept the message.")
            return
        except ContactEmailError:
            raise
        except Exception as error:
            logger.error("Contact SMTP delivery failed (%s).", type(error).__name__)
            raise ContactEmailError("The email service could not send the message.") from None

    if settings.EMAIL_PROVIDER != "resend":
        logger.error("Unsupported contact email provider is configured.")
        raise ContactEmailError("Contact email is not configured.")

    api_key = settings.RESEND_API_KEY
    sender = settings.CONTACT_EMAIL_FROM
    recipient = settings.CONTACT_EMAIL_TO
    if not all((api_key, sender, recipient)):
        logger.error("Contact email delivery is missing server configuration.")
        raise ContactEmailError("Contact email is not configured.")

    payload = json.dumps({
        "from": sender,
        "to": [recipient],
        "reply_to": contact["email"],
        "subject": subject,
        "text": message,
    }).encode()
    request = Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=15) as response:
            result = json.loads(response.read().decode())
            if not result.get("id"):
                raise ContactEmailError("The email provider did not confirm delivery.")
    except ContactEmailError:
        raise
    except HTTPError as error:
        # Don't log provider bodies: they may include recipient or sender addresses.
        logger.error("Contact email provider returned HTTP %s.", error.code)
        raise ContactEmailError("The email provider rejected the message.") from None
    except (URLError, TimeoutError, OSError, json.JSONDecodeError) as error:
        logger.error("Contact email provider request failed (%s).", type(error).__name__)
        raise ContactEmailError("The email provider could not be reached.") from None
