# Bookmarks Django / React app

Deployed to: https://bookmarks-web.herokuapp.com/

## Quickstart

Get the source from github.

    git clone git@github.com:HBalija/bookmarks-django-react.git


## Frontend Quickstart

Install dependencies:

    yarn install

Run development server:

    yarn start

Build project:

    yarn build


## Backend Quickstart

Create Python3 virtual environment

Install requirements:

    pip install -r ./requirements.txt

Create .env file and define environment variables showed in env.sample.
For development, only DEBUG set to true and DATABASE_URL variables are required.

Migrate the database:

    python manage.py migrate

Create super user:

    python manage.py createsuperuser

Run development server:

    python manage.py runserver

To view admin page, point your browser to:

    127.0.0.1:8000/admin/


### Testing

Run tests:

    make test

Run tests with coverage:

    make coverage

Show coverage report:

    make coverage-report


### Demo

Run demo:

    make api-demo

Also, samples of curl commands are included in `curl-commands.txt`
