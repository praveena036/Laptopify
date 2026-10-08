from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from django.conf import settings


def health_check(request):
    return JsonResponse({"status": "ok", "demo_mode": settings.DEMO_MODE})


urlpatterns = [
    path("api/health/", health_check, name="health-check"),
    path("admin/", admin.site.urls),

    # Authentication APIs
    path("api/auth/", include("accounts.urls")),

    # KYC APIs
    path("api/kyc/", include("kyc.urls")),

    # Seller inspection and buyback acceptance APIs
    path("api/inspections/", include("inspections.urls")),
    path("api/purchases/", include("purchases.urls")),

    # Laptop Request APIs
    path(
        "api/laptop-requests/",
        include("laptop_requests.urls")
    ),

    # Contact APIs
    path(
        "api/contact/",
        include("contact.urls")
    ),
]
