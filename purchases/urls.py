from django.urls import path

from .views import AcceptBuybackOfferView, RejectBuybackOfferView


urlpatterns = [
    path("<int:laptop_request_id>/accept/", AcceptBuybackOfferView.as_view(), name="buyback-accept"),
    path("<int:laptop_request_id>/reject/", RejectBuybackOfferView.as_view(), name="buyback-reject"),
]
