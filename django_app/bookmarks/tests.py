from rest_framework.test import APIClient

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from bookmarks.models import Bookmark

User = get_user_model()


class BaseTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='user', password='0000')
        self.bookmark1 = Bookmark.objects.create(
            user=self.user,
            is_public=True,
            name='bookmark1',
            description='bookmark1 description',
            bookmark_link='http://example.com')
        self.bookmark2 = Bookmark.objects.create(
            user=self.user,
            is_public=False,
            name='bookmark2',
            description='bookmark2 description',
            bookmark_link='http://example.com')
        self.client = APIClient()


class UserCreatetest(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.user_data = dict(username='test_user', password='0000')

    def test_create_user_succeeds(self):
        response = self.client.post(reverse('user-register'), data=self.user_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)

    def test_create_user_fails_if_username_exists(self):
        self.user_data['username'] = self.user.username
        response = self.client.post(reverse('user-register'), data=self.user_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('A user with that username already exists.', str(response.data))


class AnnonymousUserBookmarkTest(BaseTestCase):

    def test_anonymous_user_bookmark_create(self):
        response = self.client.post(reverse('bookmark-list'))
        self.assertEqual(response.status_code, 401)

    def test_anonymous_user_bookmark_list(self):
        response = self.client.get(reverse('bookmark-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data[0]['is_public'])

    def test_anonymous_user_bookmark_retrieve(self):
        response = self.client.get(reverse('bookmark-detail', kwargs={'pk': self.bookmark1.id}))
        self.assertEqual(response.data['id'], self.bookmark1.id)
        self.assertEqual(response.status_code, 200)

        # cannot fetch private bookmark
        response = self.client.get(reverse('bookmark-detail', kwargs={'pk': self.bookmark2.id}))
        self.assertEqual(response.status_code, 404)

    def test_anonymous_user_bookmark_delete(self):
        response = self.client.delete(reverse('bookmark-detail', kwargs={'pk': self.bookmark1.id}))
        self.assertEqual(response.status_code, 401)


class RegisteredUserBookmarkTest(BaseTestCase):

    def setUp(self):
        super().setUp()
        self.api_user = User.objects.create_user(username='api_user', password='0000')
        self.data = dict(
            is_public=False,
            name='api bookmark',
            description='api bookmark description',
            bookmark_link='http://example.com')
        self.client.login(username='api_user', password='0000')

    def test_api_user_bookmark_create_and_list(self):
        self.assertEqual(Bookmark.objects.count(), 2)
        response = self.client.post(reverse('bookmark-list'), data=self.data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Bookmark.objects.count(), 3)

        # user can fetch his and other users public bookmarks only
        response = self.client.get(reverse('bookmark-list'))
        self.assertEqual(len(response.data), 2)

    def test_api_user_handle_his_bookmarks(self):
        response = self.client.post(reverse('bookmark-list'), data=self.data)
        bookmark = Bookmark.objects.filter(user=self.api_user).first()
        self.assertEqual(bookmark.name, 'api bookmark')

        response = self.client.delete(reverse('bookmark-detail', kwargs={'pk': bookmark.id}))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Bookmark.objects.filter(user=self.api_user).exists())

    def test_api_user_handle_other_users_bookmarks(self):
        self.assertTrue(self.bookmark1.is_public)

        response = self.client.get(reverse('bookmark-detail', kwargs={'pk': self.bookmark1.id}))
        # api user can retrieveusers public bookmarks
        self.assertEqual(response.status_code, 200)

        response = self.client.delete(reverse('bookmark-detail', kwargs={'pk': self.bookmark1.id}))
        # api user is not authorized to delete other users public bookmarks
        self.assertEqual(response.status_code, 403)

        self.assertFalse(self.bookmark2.is_public)
        response = self.client.delete(reverse('bookmark-detail', kwargs={'pk': self.bookmark2.id}))
        # api user isn't aware of other users private bookmarks
        self.assertEqual(response.status_code, 404)
