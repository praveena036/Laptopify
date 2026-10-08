from django.urls import path

from .views import SellerInspectionView


urlpatterns = [
    path("<int:laptop_request_id>/", SellerInspectionView.as_view(), name="seller-inspection"),
]
