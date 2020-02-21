clean:
	find . -name '*.pyc' -delete
	find . -name '__pycache__' -delete
	find . -name 'Untitled.ipynb' -delete
	rm -rf '.ipynb_checkpoints'
	rm -rf '.pytest_cache'
	rm -rf 'htmlcov'
	rm -rf '.coverage'

test:
	python manage.py test

coverage:
	coverage run manage.py test bookmarks/

coverage-report:
	coverage report bookmarks/views.py bookmarks/models.py bookmarks/serializers.py bookmarks/permissions.py

api-demo:
	python manage.py api_demo
