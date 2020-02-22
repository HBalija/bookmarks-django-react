# from rest_framework import generics, permissions, viewsets
from rest_framework import generics, viewsets

from django.contrib.auth import get_user_model

from bookmarks.models import Bookmark
# from bookmarks.permissions import IsOwnerOrReadOnly
from bookmarks.serializers import BookmarkSerializer, UserRegisterSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # qs = Bookmark.objects.filter(is_public=True)

        # if self.request.user.is_authenticated:
        #     qs = qs | Bookmark.objects.filter(user=self.request.user)
        # return qs
        return Bookmark.objects.all()


class UserRegisterView(generics.CreateAPIView):
    model = get_user_model()
    serializer_class = UserRegisterSerializer
