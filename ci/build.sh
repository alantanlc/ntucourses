#!/bin/bash

# Print current directory
echo "Current directory: ${pwd}"
echo

# Allow backend directory to be writable
chmod 777 backend

# Print contents and verify modify permissions of backend directory
echo "Contents in ${pwd}:"
ls -l
echo

# Go into backend directory
cd backend

# Create virtual environment and download python packages
virtualenv env
source env/bin/activate
echo "Python path: ${which python3}"
pip install -r requirements.txt
echo

# Generate static assets
python manage.py collectstatic
echo

# List contents to check if static directory is generated
echo "Contents in ${pwd}:"
ls
echo
