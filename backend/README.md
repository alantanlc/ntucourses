## Django Readings
Here are some useful links that will get you up to speed with Django. It's a lot to cover, but you will get there one day! :)
1. [Quick Install Guide*](https://docs.djangoproject.com/en/3.0/intro/install/)
1. [Django Rest Framework***](https://medium.com/@sostomc011/https-medium-com-sostomc011-getting-started-with-django-mysql-and-react-js-backend-b962a7691486)
1. [Writing your first Django app*](https://docs.djangoproject.com/en/3.0/intro/tutorial01/) - Complete all the tutorials (Parts 1 to 7)
1. [Django Project Structure](https://docs.djangoproject.com/en/3.0/intro/reusable-apps/#your-project-and-your-reusable-app) - Good for documentation
1. [Using Django](https://docs.djangoproject.com/en/3.0/topics/)
1. [API Reference](https://docs.djangoproject.com/en/3.0/ref/)
1. [Models*](https://docs.djangoproject.com/en/3.0/topics/db/models/)
1. [Managers*](https://docs.djangoproject.com/en/3.0/topics/db/managers/)
1. [Models and databases*](https://docs.djangoproject.com/en/3.0/topics/db/)
1. [Model Field Types*](https://docs.djangoproject.com/en/3.0/ref/models/fields/#model-field-types)
1. [Queries*](https://docs.djangoproject.com/en/3.0/topics/db/queries/)
1. [Prefetch Related*](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#prefetch-related) - allows prefetch of many-to-many, many-to-one objects, foreign key and one-to-one objects
1. [Select Related*](https://docs.djangoproject.com/en/3.0/ref/models/querysets/#select-related) - Limited to single-value relationships (foreign key and one-to-one)
1. [Model Instances](https://docs.djangoproject.com/en/3.0/ref/models/instances/)
1. [Many-to-many Relationships*](https://docs.djangoproject.com/en/3.0/topics/db/examples/many_to_many/)
1. [Many-to-one Relationships*](https://docs.djangoproject.com/en/3.0/topics/db/examples/many_to_one/)
1. [One-to-one Relationships*](https://docs.djangoproject.com/en/3.0/topics/db/examples/one_to_one/)
1. [JSONField](https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/fields/#django.contrib.postgres.fields.JSONField)
1. [Django PostgreSQL specific model fields](https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/fields/)
1. [How Django know to UPDATE vs. INSERT](https://docs.djangoproject.com/en/3.0/ref/models/instances/#how-django-knows-to-update-vs-insert)
1. [Updating attributes based on existing fields](https://docs.djangoproject.com/en/3.0/ref/models/instances/#updating-attributes-based-on-existing-fields)
1. [Logging*](https://docs.djangoproject.com/en/3.0/topics/logging/)
1. [Use bulk methods](https://docs.djangoproject.com/en/3.0/topics/db/optimization/#use-bulk-methods)
1. [Performance and optimization](https://docs.djangoproject.com/en/3.0/topics/performance/)
1. [Database access optimization](https://docs.djangoproject.com/en/3.0/topics/db/optimization/)
1. [Do database work in the database rather than in Python*](https://docs.djangoproject.com/en/3.0/topics/db/optimization/#do-database-work-in-the-database-rather-than-in-python)
1. [Use foreign key values directly](https://docs.djangoproject.com/en/3.0/topics/db/optimization/#use-foreign-key-values-directly)
1. [Retrieve everything at once if you know you will need it*](https://docs.djangoproject.com/en/3.0/topics/db/optimization/#retrieve-everything-at-once-if-you-know-you-will-need-it)
1. [Following Relationships "backward"*](https://docs.djangoproject.com/en/3.0/topics/db/queries/#following-relationships-backward)
1. [Queries over related objected*](https://docs.djangoproject.com/en/3.0/topics/db/queries/#queries-over-related-objects)
1. [GeoDjango](https://docs.djangoproject.com/en/3.0/ref/contrib/gis/) - Potential use for displaying lesson venus on a map
1. [Pagination](https://docs.djangoproject.com/en/3.0/topics/pagination/)
1. [Query Expressions](https://docs.djangoproject.com/en/3.0/ref/models/expressions/)
1. [Django documentation](https://docs.djangoproject.com/en/3.0/)
1. ["How-to" guides](https://docs.djangoproject.com/en/3.0/howto/)
1. [What to read next](https://docs.djangoproject.com/en/3.0/intro/whatsnext/)
1. [Writing your first patch for Django](https://docs.djangoproject.com/en/3.0/intro/contributing/) - Not relevant to our NTUCourses project, but good to know if you're into contributing to Django!

\* Important

## Installation Guides
- [Install pip and virtualenv on Ubuntu 20.04 LTS](https://github.com/alanwuha/installing-pip-and-virtualenv-ubuntu-20.04)
- [Install Postgresql Server on Ubuntu](https://help.ubuntu.com/18.04/serverguide/serverguide.pdf#page=243&zoom=100,72,96)
- [Install nginx](http://nginx.org/en/linux_packages.html#Ubuntu)
- [Enabling HTTPS on Nginx on Ubuntu 20.04 using Certbot](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx)

## API Reference
Here's where our API reference lives [here](https://api.ntucourses.com).

## Tests
Django's unit tests use Python standard library module: [unittest](https://docs.python.org/3/library/unittest.html#module-unittest). Learn more about writing and running tests with Django [here](https://docs.djangoproject.com/en/3.0/topics/testing/overview/) and [here](https://docs.djangoproject.com/en/3.0/intro/tutorial05/). Our test script resides [here](#). 

#### Running the test script

In your terminal, run the test script with:
```
python manage.py test ntucourses
```

and you'll see something like:
```
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.
----------------------------------------------------------------------
Ran 1 test in 0.001s

OK
Destroying test database for alias 'default'...
```

If any test cases fail, you will see something like:
```
to fill in
```

#### Code Coverage

We need help with increasing our [code coverage](https://adamj.eu/tech/2019/04/30/getting-a-django-application-to-100-percent-coverage/) (i.e. write missing test cases!). It will help to identify untested parts and fragile or dead code. If you can't test a piece of code, it usually means that the code should be refactored or removed. See [Integration with coverage.py](https://docs.djangoproject.com/en/3.0/topics/testing/advanced/#topics-testing-code-coverage) for details.

In your terminal, run [coverage](https://pypi.org/project/coverage/) with:
```
coverage run --source='.' manage.py test api
```

and you'll see something like:
```
Name                                            Stmts   Miss  Cover
-------------------------------------------------------------------
manage.py                                          12      2    83%
mysite/__init__.py                                  0      0   100%
mysite/asgi.py                                      4      4     0%
mysite/settings.py                                 18      0   100%
mysite/urls.py                                      3      0   100%
mysite/wsgi.py                                      4      4     0%
ntucourses/__init__.py                              0      0   100%
ntucourses/admin.py                                 4      0   100%
ntucourses/apps.py                                  3      0   100%
ntucourses/migrations/0001_initial.py               5      0   100%
ntucourses/migrations/0002_choice.py                5      0   100%
ntucourses/migrations/0003_auto_20200229_2005.py    4      0   100%
ntucourses/migrations/0004_choice_question.py       6      0   100%
ntucourses/migrations/__init__.py                   0      0   100%
ntucourses/models.py                               18      1    94%
ntucourses/tests.py                                57      0   100%
ntucourses/urls.py                                  4      0   100%
ntucourses/views.py                                28      8    71%
-------------------------------------------------------------------
TOTAL                                             175     19    89%
```

### Blue Sky Features
1. Module recommendation engine (based on view history or modules registered)
1. Photo gallery for each module (post group photos, sample questions, what goes on during tutorials/labs/lectures)
1. Automatic module scheduler (e.g A-star algorithm)
1. Link to exam papers
1. Module index swapper?
