from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

from .models import LaptopRequest
from .serializers import LaptopRequestSerializer


class LaptopRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = LaptopRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return LaptopRequest.objects.all().order_by("-created_at")

        if user.role == "seller":
            return LaptopRequest.objects.filter(
                seller=user
            ).order_by("-created_at")

        return LaptopRequest.objects.none()

    def perform_create(self, serializer):
        user = self.request.user

        if user.role != "seller":
            raise PermissionDenied(
                "Only sellers can submit laptop requests."
            )

        serializer.save(
            seller=user,
            status="submitted"
        )


class LaptopRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LaptopRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == "admin":
            return LaptopRequest.objects.all()

        if user.role == "seller":
            return LaptopRequest.objects.filter(seller=user)

        return LaptopRequest.objects.none()