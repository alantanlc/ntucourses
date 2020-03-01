## NTU Mods
Course planner for Nanyang Technological University.

[![Build Status](https://travis-ci.org/akashnimare/foco.svg?branch=master)](https://travis-ci.org/akashnimare/foco)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/alanwuha911477/ntumods)

## Motivation
Information on NTU [course content](https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont.main/pls/webexe/AUS_SUBJ_CONT.instruction), [class schedule](https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main), and [exam timetable](https://wis.ntu.edu.sg/webexe/owa/exam_timetable_und.main) are all over the place with little search and filter capabilities. This project aims to integrate all information into a single platform for your convenience in planning your modules.

## Built with
A quick overview of our Tech Stack:
- [React](https://electron.atom.io) - Frontend Library
- [Redux](https://redux.js.org) - State Management Tool
- [Bootstrap](https://getbootstrap.com) - Frontend Component
- [Django](https://www.djangoproject.com) - Server
- [PostgreSQL](https://www.postgresql.org) - Database
- [Swagger](https://django-rest-swagger.readthedocs.io/en/latest/) - Swagger/OpenAPI Documentation

## Code style
- [Python](https://github.com/google/styleguide/blob/gh-pages/pyguide.md)
- [Javascript](https://google.github.io/styleguide/jsguide.html)

## Installation
Provide step by step series of examples and explanations about how to get a development env running.

## API Reference
Here's where our API reference lives. [swagger](#)

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

We need help with increasing our code coverage. Code coverage will help to identify untested parts and fragile or dead code. If you can't test a piece of code, it usually means that code should be refactored or removed. See [Integration with coverage.py](https://docs.djangoproject.com/en/3.0/topics/testing/advanced/#topics-testing-code-coverage) for details.

In your terminal, run the coverage with:
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

## Contribute

Help wanted and very much appreciated! Refer to our [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md).

## Credits
Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project. 

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [Alan Tan](https://github.com/alanwuha)
