from django.urls import path
from .views import KYCSubmitView

urlpatterns = [
    path("submit/", KYCSubmitView.as_view(), name="kyc-submit"),
]