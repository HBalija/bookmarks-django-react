from rest_framework_simplejwt import views as jwt_views

from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bookmarks.urls')),
    path('api/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

if not settings.DEBUG:
    urlpatterns.append(re_path('.*', TemplateView.as_view(template_name='index.html')))
