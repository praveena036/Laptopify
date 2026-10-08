from django.urls import path

from .views import (
    LaptopRequestListCreateView,
    LaptopRequestDetailView,
)

urlpatterns = [
    path(
        "",
        LaptopRequestListCreateView.as_view(),
        name="laptop-request-list-create",
    ),

    path(
        "<int:pk>/",
        LaptopRequestDetailView.as_view(),
        name="laptop-request-detail",
    ),
]