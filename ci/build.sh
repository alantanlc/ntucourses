#!/bin/bash

# Print current directory
echo "Current directory:"
pwd
echo

# Allow backend directory to be writable
chmod 775 backend

# Print contents and verify modify permissions of backend directory
echo "List files and directories in $(pwd):"
ls -l
echo

# Go into backend directory
cd backend
echo "Current directory:"
pwd
echo

# Create virtual environment and download python packages
echo "Create virtual environment in $(pwd):"
virtualenv env
source env/bin/activate
echo
echo "Python path:"
which python3
echo
echo "Install python packages using pip:"
pip install -r requirements.txt
echo

# Generate static assets
echo "Django collect static:"
python manage.py collectstatic --no-input
echo

# List contents to check if static directory is generated
echo "List files and directories in $(pwd):"
ls -l
echo

