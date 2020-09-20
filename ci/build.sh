#!/bin/bash

pwd
ls
chmod 777 backend
cd backend
virtualenv env
source env/bin/activate
which python3
pip install -r requirements.txt
python manage.py collectstatic
ls
