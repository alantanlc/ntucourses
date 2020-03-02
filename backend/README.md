## Readings
1. [Django Quick Install Guide](https://docs.djangoproject.com/en/3.0/intro/install/)
1. [Writing your first Django app](https://docs.djangoproject.com/en/3.0/intro/tutorial01/)
1. [Django Models](https://docs.djangoproject.com/en/3.0/topics/db/models/)

## Tests
Django's unit tests use Python standard library module: [unittest](https://docs.python.org/3/library/unittest.html#module-unittest). Learn more about writing and running tests with Django [here](https://docs.djangoproject.com/en/3.0/topics/testing/overview/) and [here](https://docs.djangoproject.com/en/3.0/intro/tutorial05/). Our test script resides [here](#). 

In your terminal, run the test script with:
```
python manage.py test ntumods
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
ntumods/__init__.py                                 0      0   100%
ntumods/admin.py                                    4      0   100%
ntumods/apps.py                                     3      0   100%
ntumods/migrations/0001_initial.py                  5      0   100%
ntumods/migrations/0002_choice.py                   5      0   100%
ntumods/migrations/0003_auto_20200229_2005.py       4      0   100%
ntumods/migrations/0004_choice_question.py          6      0   100%
ntumods/migrations/__init__.py                      0      0   100%
ntumods/models.py                                  18      1    94%
ntumods/tests.py                                   57      0   100%
ntumods/urls.py                                     4      0   100%
ntumods/views.py                                   28      8    71%
-------------------------------------------------------------------
TOTAL                                             175     19    89%
```