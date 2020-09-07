#!/bin/bash
#############################
#
# Scraper script.
#
#############################

# Navigate to Django root directory
cd /home/$(whoami)/ntucourses/backend

# Activate virtual environment
source env/bin/activate

# Print start status message
echo "Starting scrapers"
date
echo

# Scrape commands
python manage.py scrapecourses
python manage.py scrapeprogrammecourses
python manage.py scrapeclasses
python manage.py scrapeexams
python manage.py scrapevenues

# Print end status message
echo
echo "Scraping finished"
date
