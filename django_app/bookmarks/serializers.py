from django.contrib.auth import get_user_model
from rest_framework import serializers

from bookmarks.models import Bookmark


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('id', 'username')


class BookmarkSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Bookmark
        fields = ('id', 'description', 'user', 'is_public', 'name', 'bookmark_link', 'created_at')


class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password')
