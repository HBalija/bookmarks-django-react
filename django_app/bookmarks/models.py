from django.db import models
from django.conf import settings


class Bookmark(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookmarks')
    is_public = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    name = models.CharField(max_length=100)
    bookmark_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.name}'

    class Meta:
        ordering = ['-created_at']
