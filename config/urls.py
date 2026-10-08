from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication APIs
    path("api/auth/", include("accounts.urls")),

    # KYC APIs
    path("api/kyc/", include("kyc.urls")),

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