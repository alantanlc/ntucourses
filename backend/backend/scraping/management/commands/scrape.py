from django.core.management.base import BaseCommand

from bs4 import BeautifulSoup
import json

import urllib.parse
import urllib.request

from django.utils import timezone

from scraping.models import Course

class Command(BaseCommand):
    help = "collect courses"

    # define logic of command
    def handle(self, *args, **options):
        # Construct URL request information
        url = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1"
        user_agent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64)'
        values = {
            'acadsem': '',
            'boption': 'Search',
            'acad': '2019',
            'semester': '',
        }
        headers = {
            'User-Agent': user_agent,
        }

        # Log number of courses found, saved, and missed for each semester
        course_statistics = {}

        for sem in ['1', '2', 'S', 'T']:
            # Modify semester in values
            values['semester'] = sem

            # Encode values and construct request
            data = urllib.parse.urlencode(values)
            data = data.encode('ascii') # data should be bytes
            req = urllib.request.Request(url, data, headers)

            # Send request
            with urllib.request.urlopen(req) as response:
                # Convert response to soup
                soup = BeautifulSoup(response, 'html.parser')

                # Get tds containing course_code, title, and academic unit
                courses = soup.select("td[width]")

                # Get tds course descriptions
                course_description = soup.select("td[width='650']")

                # Get number of courses
                num_of_td_per_course = 5
                num_of_td_headers = 4
                num_of_courses = int((len(courses) - num_of_td_headers) // num_of_td_per_course)
                print('%d courses found' % num_of_courses)

                # Initialize count of courses saved for this semester
                course_statistics[sem] = {}
                course_statistics[sem]['saved'] = 0
                course_statistics[sem]['missed'] = 0
                course_statistics[sem]['total'] = num_of_courses

                # extract course_code, title, au
                for i in range(num_of_courses):
                    try:
                        index = int(num_of_td_headers + i * num_of_td_per_course)
                        course_code = courses[index].find('font').text.strip()
                        title = courses[index+1].find('font').text.strip()
                        description = course_description[i].find("font").text.strip()
                        academic_units = courses[index+2].find('font').text.strip()

                        # save in db
                        Course.objects.update_or_create(
                            course_code=course_code,
                            title=title,
                            description=description,
                            academic_units=academic_units,
                        )
                        
                        course_statistics[sem]['saved'] += 1
                        print('%s added' % course_code)
                    except:
                        print('Failed to extract or save course %d' % (i,))
                        course_statistics[sem]['missed'] += 1

        print(course_statistics)
        print('job complete')