from django.core.management.base import BaseCommand
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Venue
import json
from bs4 import BeautifulSoup
import sys

class Command(BaseCommand):
    help = "collect courses"

    def __init__(self):
        self.venues = {}
        self.venues['LT'] = 'Lecture Theatres'
        self.venues['LIB'] = 'Libraries'
        self.venues['EH'] = 'Examination Halls'
        self.venues['MR'] = 'Meeting Rooms'
        self.venues['RR'] = 'Reading Rooms'
        self.venues['SR'] = 'Seminar Rooms'
        self.venues['TR'] = 'Tutorial Rooms'
        self.venues['TR+'] = 'Tutorial Rooms +'
        self.venues['LAB'] = 'Laboratories'

    def get_venue_name(self, marker_html_string):
        name = ''
        if marker_html_string:
            soup = BeautifulSoup(marker_html_string, 'html.parser')
            name = soup.a.text
        return name

    def get_venue_unit(self, marker_html_string):
        unit = ''
        if marker_html_string:
            soup = BeautifulSoup(marker_html_string, 'html.parser')
            unit = soup.div.div.text.split(',')[0]
        return unit

    # Define logic of command
    def handle(self, *args, **options):
        # Construct URL request information
        base_url = 'https://maps.ntu.edu.sg/a/search'
        user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        values = {}
        headers = {
            'User-Agent': user_agent,
        }

        # Log number of venues found, saved, and missed for each venue type
        venue_statistics = {}

        # Extract venues for each venue type
        for venue_key, venue_name in self.venues.items():
            # Modify q in values
            values['q'] = venue_name

            # Encode values and construct request
            data = urllib.parse.urlencode(values)
            full_url = base_url + '?' + data
            req = urllib.request.Request(full_url, headers=headers)

            # Send request
            with urllib.request.urlopen(req) as response:
                try:
                    # Parse response as json object
                    data = json.load(response)

                    # Get markers
                    markers = data['what']['markers']

                    # Initialize count of courses saved for this semester
                    venue_statistics[venue_key] = {}
                    venue_statistics[venue_key]['saved'] = 0
                    venue_statistics[venue_key]['missed'] = 0
                    venue_statistics[venue_key]['total'] = len(markers)
                    
                    # Extract venue content
                    for i, marker in enumerate(markers):
                        try:
                            # Venue attributes
                            name = self.get_venue_name(marker['html'])
                            unit = self.get_venue_unit(marker['html'])
                            lat = marker['latlng'][0]
                            lng = marker['latlng'][1]

                            # Save in db
                            Venue.objects.update_or_create(
                                name=name,
                                defaults={
                                    'unit': unit,
                                    'venue_type': venue_key,
                                    'lat': lat,
                                    'lng': lng,
                                }
                            )
                            
                            venue_statistics[venue_key]['saved'] += 1
                            print('%s added' % name)
                        except:
                            e = sys.exc_info()
                            print('Failed to extract or save venue %d' % (i,))
                            venue_statistics[venue_key]['missed'] += 1
                except:
                    e = sys.exc_info()
                    print('Failed to extract venues from %d' % venue_name)

        print(venue_statistics)
        print('job complete')