docker-compose.yml

    version: "3"

    services:
      rango_api:
        container_name: rango
        build: ./
        command: python manage.py runserver 0.0.0.0:8000
        command: python manage.py search_index --rebuild
        working_dir: /usr/src/rango_api
        environment:
          REDIS_URI: redis://redis:6379
        ports:
          - "8000:8000"
        volumes:
          - ./:/usr/src/rango_api
        links:
          - redis
          - elasticsearch


      #redis
      redis:
        image: redis
        environment:
          - ALLOW_EMPTY_PASSWORD=yes
        ports:
          - "6379:6379"

      elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:6.5.0
        ports:
          - "9200:9200"
          - "9300:9300"



django settings.py elastic search connection


    ELASTICSEARCH_DSL = {
        'default': {
            'hosts': 'elasticsearch:9200'
        },
    }


        rango            | Are you sure you want to delete the 'posts' indexes? [n/Y]: Traceback (most recent call last):
        rango            |   File "manage.py", line 15, in <module>
        rango            |     execute_from_command_line(sys.argv)
        rango            |   File "/usr/local/lib/python3.6/site-packages/django/core/management/__init__.py", line 381, in execute_from_command_line
        rango            |     utility.execute()
        rango            |   File "/usr/local/lib/python3.6/site-packages/django/core/management/__init__.py", line 375, in execute
        rango            |     self.fetch_command(subcommand).run_from_argv(self.argv)
        rango            |   File "/usr/local/lib/python3.6/site-packages/django/core/management/base.py", line 316, in run_from_argv
        rango            |     self.execute(*args, **cmd_options)
        rango            |   File "/usr/local/lib/python3.6/site-packages/django/core/management/base.py", line 353, in execute
        rango            |     output = self.handle(*args, **options)
        rango            |   File "/usr/local/lib/python3.6/site-packages/django_elasticsearch_dsl/management/commands/search_index.py", line 134, in handle
        rango            |     self._rebuild(models, options)
        rango            |   File "/usr/local/lib/python3.6/site-packages/django_elasticsearch_dsl/management/commands/search_index.py", line 111, in _rebuild
        rango            |     if not self._delete(models, options):
        rango            |   File "/usr/local/lib/python3.6/site-packages/django_elasticsearch_dsl/management/commands/search_index.py", line 100, in _delete
        rango            |     "the '{}' indexes? [n/Y]: ".format(", ".join(index_names)))
        rango            | EOFError: EOF when reading a line



i am trying elastci search with django inside docker using docker-compose.
but in elastci search while building index it is asking yes or no.
 how can i manage this problem.

 please have look.

 Thanks..
