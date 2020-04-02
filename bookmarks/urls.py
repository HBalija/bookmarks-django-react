from django.urls import path

from bookmarks.views import BookmarkViewSet, UserRegisterView


bookmark_list = BookmarkViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
bookmark_detail = BookmarkViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('bookmarks/', bookmark_list, name='bookmark-list'),
    path('bookmarks/<int:pk>/', bookmark_detail, name='bookmark-detail'),
    path('register/', UserRegisterView.as_view(), name='user-register'),
]
