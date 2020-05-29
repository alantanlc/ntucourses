# Use an official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.7

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install dependencies
RUN pip install -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --no-input

# Migrate database
# CMD exec python manage.py migrate --no-input

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 8000

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one work process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 mysite.wsgi