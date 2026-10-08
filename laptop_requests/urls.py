from django.urls import path

from .views import (
    LaptopRequestListCreateView,
    LaptopRequestDetailView,
    LaptopRequestWorkflowView,
)

urlpatterns = [
    path(
        "",
        LaptopRequestListCreateView.as_view(),
        name="laptop-request-list-create",
    ),

    path(
        "<int:pk>/workflow/",
        LaptopRequestWorkflowView.as_view(),
        name="laptop-request-workflow",
    ),
    path(
        "<int:pk>/",
        LaptopRequestDetailView.as_view(),
        name="laptop-request-detail",
    ),
]
