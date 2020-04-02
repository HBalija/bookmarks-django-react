import requests
import sys
from urllib.parse import urljoin

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.urls import reverse

from bookmarks.models import Bookmark


BOOKMARK_DATA_PUBLIC = {
    'name': 'public bookmark',
    'description': 'public bookmark description',
    'is_public': True,
    'bookmark_link': 'http://example.com'
}

BOOKMARK_DATA_PRIVATE = {
    'name': 'private bookmark',
    'description': 'private bookmark description',
    'is_public': False,
    'bookmark_link': 'http://example.com'
}

USER_ONE = {
    'username': 'first_demo_user',
    'password': '0000'
}

USER_TWO = {
    'username': 'second_demo_user',
    'password': '0000'
}


def process_request(method, url, data=None, auth=None):
    """
    Create a request object depending on HTTP method and trigger it with
    provided parameters.

    Log response status code and response data.
    Return response data for created objects.
    """
    response = getattr(requests, method)(url, data=data, auth=auth)
    sys.stdout.write(f'Response status code: {response.status_code}\n')

    if response.status_code in (200, 201):
        sys.stdout.write(f'Response data: {response.json()}\n')

    sys.stdout.write('\n')

    if response.status_code == 201:
        return response.json()


def join_url(path):
    """
    Join domain url with path provided.
    """
    return urljoin(settings.DEMO_DOMAIN_URL, path)


class Command(BaseCommand):
    help = """
    Run a api demo.

    Authenticated users can create private and public bookmarks and can
    list / retrieve their and other public bookmarks. They can delete / update
    their bookmarks but cannot do the same with other users bookmarks.

    Annonymous users can only list / retrieve public bookmarks and cannot create
    bookmarks or update / delete existing ones.
    """

    def handle(self, *args, **options):

        User = get_user_model()

        # Delete demo users and their bookmarks (cascade relationship)
        User.objects.filter(username__contains='demo').delete()

        sys.stdout.write('### Anonymous user creates a bookmark\n')
        process_request('post', join_url(reverse('bookmark-list')))  # 403

        sys.stdout.write('### Create first demo user\n')
        data = process_request('post', join_url(reverse('user-register')), data=USER_ONE)  # 201

        user_one = User.objects.get(**data)

        sys.stdout.write('### Create another user with the same username.\n')
        process_request('post', join_url(reverse('user-register')), data=USER_ONE)  # 400

        sys.stdout.write('### User one creates a public bookmark.\n')
        process_request(
            'post',
            join_url(reverse('bookmark-list')),
            data=BOOKMARK_DATA_PUBLIC,
            auth=(USER_ONE['username'], USER_ONE['password']))  # 201

        sys.stdout.write('### User one creates a private bookmark.\n')
        data = process_request(
            'post',
            join_url(reverse('bookmark-list')),
            data=BOOKMARK_DATA_PRIVATE,
            auth=(USER_ONE['username'], USER_ONE['password']))  # 201

        u1_private = Bookmark.objects.get(**data)

        sys.stdout.write('### Create second demo user.\n')
        process_request('post', join_url(reverse('user-register')), data=USER_TWO)  # 201

        sys.stdout.write('### User two creates a public bookmark.\n')
        data = process_request(
            'post',
            join_url(reverse('bookmark-list')),
            data=BOOKMARK_DATA_PUBLIC,
            auth=(USER_TWO['username'], USER_TWO['password']))  # 201

        u2_public = Bookmark.objects.get(**data)

        sys.stdout.write('### User two creates a private bookmark.\n')
        data = process_request(
            'post',
            join_url(reverse('bookmark-list')),
            data=BOOKMARK_DATA_PRIVATE,
            auth=(USER_TWO['username'], USER_TWO['password']))  # 201

        u2_private = Bookmark.objects.get(**data)

        sys.stdout.write('### Annonymous user lists bookmarks. Has access only to public ones.\n')
        process_request('get', join_url(reverse('bookmark-list')))  # 200

        sys.stdout.write('### Annonymous user tries to delete / update a bookmark.\n')
        process_request(
            'delete', join_url(reverse('bookmark-detail', kwargs={'pk': u2_public.id})))  # 400

        sys.stdout.write(f'### User with id={user_one.id} lists bookmarks.')
        sys.stdout.write(' Has access to his and other public ones.\n')
        process_request(
            'get',
            join_url(reverse('bookmark-list')),
            auth=(USER_ONE['username'], USER_ONE['password']))  # 200

        sys.stdout.write(f'### User with id={user_one.id} tries to delete / update')
        sys.stdout.write(' other user public bookmark.\n')
        process_request(
            'delete',
            join_url(reverse('bookmark-detail', kwargs={'pk': u2_public.id})),
            auth=(USER_ONE['username'], USER_ONE['password']))  # 400

        sys.stdout.write(f'### User with id={user_one.id} tries to delete / update')
        sys.stdout.write(' other user private bookmark (he should not be aware of it).\n')
        process_request(
            'delete',
            join_url(reverse('bookmark-detail', kwargs={'pk': u2_private.id})),
            auth=(USER_ONE['username'], USER_ONE['password']))  # 404

        sys.stdout.write(f'### User updates his own bookmark.\n')
        process_request(
            'patch',
            join_url(reverse('bookmark-detail', kwargs={'pk': u1_private.id})),
            data={'is_public': True},
            auth=(USER_ONE['username'], USER_ONE['password']))  # 200

        sys.stdout.write(f'### User deletes his own bookmark.\n')
        process_request(
            'delete',
            join_url(reverse('bookmark-detail', kwargs={'pk': u1_private.id})),
            auth=(USER_ONE['username'], USER_ONE['password']))  # 204

        # Delete demo users and their bookmarks (cascade relationship)
        User.objects.filter(username__contains='demo').delete()
