from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    RegisterView,
    SendOTPView,
    VerifyOTPView,
    DemoLoginView,
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('demo-login/', DemoLoginView.as_view(), name='demo-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
