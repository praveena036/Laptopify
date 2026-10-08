"""SMS verification provider integration."""

import base64
import json
import logging
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings


logger = logging.getLogger(__name__)


class SMSProviderError(Exception):
    """Raised when an SMS provider is not configured or rejects a request."""


def is_twilio_enabled():
    return settings.SMS_PROVIDER == "twilio"


def _twilio_request(resource, fields):
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    service_sid = settings.TWILIO_VERIFY_SERVICE_SID
    if not all((account_sid, auth_token, service_sid)):
        raise SMSProviderError("Twilio Verify is not fully configured.")

    url = f"https://verify.twilio.com/v2/Services/{service_sid}/{resource}"
    credentials = base64.b64encode(f"{account_sid}:{auth_token}".encode()).decode()
    request = Request(
        url,
        data=urlencode(fields).encode(),
        headers={
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urlopen(request, timeout=12) as response:
            return json.loads(response.read().decode())
    except HTTPError as error:
        if resource == "VerificationCheck" and error.code == 404:
            return {"status": "expired"}
        logger.warning("Twilio Verify request failed (HTTP %s).", error.code)
        raise SMSProviderError("The verification provider could not complete the request.") from None
    except (URLError, TimeoutError, json.JSONDecodeError) as error:
        # Provider responses may contain a phone number; never log their body.
        logger.warning("Twilio Verify request failed (%s).", type(error).__name__)
        raise SMSProviderError("The verification provider could not complete the request.") from None


def send_verification(phone_number):
    result = _twilio_request(
        "Verifications",
        {"To": phone_number, "Channel": "sms"},
    )
    if result.get("status") not in {"pending", "approved"}:
        raise SMSProviderError("The verification provider did not accept the request.")


def check_verification(phone_number, code):
    result = _twilio_request(
        "VerificationCheck",
        {"To": phone_number, "Code": code},
    )
    return result.get("status") == "approved"
