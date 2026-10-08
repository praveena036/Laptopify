from django.urls import path

from .views import AcceptBuybackOfferView


urlpatterns = [
    path("<int:laptop_request_id>/accept/", AcceptBuybackOfferView.as_view(), name="buyback-accept"),
]
