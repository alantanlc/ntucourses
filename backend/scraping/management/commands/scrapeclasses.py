from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Class, Course
import datetime
import sys

from django.db import IntegrityError
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = "collect classes"

    def __init__(self):
        self.terms = [
            { 'year': 2020, 'semester': '1', 'index': 1 },
            { 'year': 2019, 'semester': '2', 'index': 2 },
            { 'year': 2019, 'semester': 'S', 'index': 4 },
            { 'year': 2019, 'semester': 'T', 'index': 5 }
        ]

    def get_datetime(self, time_string):
        start_time, end_time = '', ''
        if time_string:
            start, end = time_string.split('-')
            start_hour, start_minutes = int(start[:2]), int(start[2:])
            end_hour, end_minutes = int(end[:2]), int(end[2:])
            start_time = datetime.time(start_hour, start_minutes)
            end_time = datetime.time(end_hour, end_minutes)
        return start_time, end_time

    # Define logic of command
    def handle(self, *args, **options):
        # Construct URL request information
        url = 'https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1'
        user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        values = {
            'r_search_type': 'F',
            'boption': 'Search',
            'acadsem': '2019;2',
            'r_subj_code': '',
            'staff_access': 'false',
        }
        headers = {
            'User-Agent': user_agent,
        }

        # Log number of courses and classes found, saved, and missed for each semester
        course_statistics = {}
        class_statistics = {}

        # Extract classes for each semester
        for term in self.terms:
            # Modify semester in values
            values['acadsem'] = ';'.join([str(term['year']), term['semester']])

            # Encode values and construct request
            data = urllib.parse.urlencode(values)
            data = data.encode('ascii') # data should be bytes
            req = urllib.request.Request(url, data, headers)

            # Send request
            with urllib.request.urlopen(req) as response:
                # Convert response to soup
                soup = BeautifulSoup(response, 'html.parser')

                # Get all relevant class tags
                classes = soup.select("td[width='100'],tr[bgcolor]")
                course_start_indices = [i for i, c in enumerate(classes) if c.name == 'td' and c.text != 'Remark:']

                # Clear soup from memory (prevents stack overflow during debugging)
                del soup

                # Get number of courses
                num_of_courses = len(course_start_indices)
                print('%d courses found' % num_of_courses)

                # Initialize count of courses saved for this semester
                course_statistics[term['semester']] = {}
                course_statistics[term['semester']]['saved'] = 0
                course_statistics[term['semester']]['missed'] = 0
                course_statistics[term['semester']]['total'] = num_of_courses

                # Initialize count of classes saved for this semester
                class_statistics[term['semester']] = {}
                class_statistics[term['semester']]['saved'] = 0
                class_statistics[term['semester']]['missed'] = 0
                class_statistics[term['semester']]['total'] = 0

                # Delete all classes in current semester
                if(num_of_courses != 0):
                    Class.objects.filter(semester=term['index']).delete()

                # Extract course content
                for i, index in enumerate(course_start_indices):
                    # Get list of course tags and texts
                    course_tags = classes[index:course_start_indices[i+1]] if i < len(course_start_indices) - 1 else classes[index:]
                    course_texts = [content.text for content in course_tags if content.text and content.text != 'Remark:']

                    # Course code
                    course_code = course_texts[0]
                    print('Scrapping classes for %s' % course_code)

                    # Extract classes from course
                    previous_index = ''
                    for j, text in enumerate(course_texts[1:]):
                        try:
                            class_texts = [t.strip() for t in text.split('\n')]

                            # Class attributes
                            index = class_texts[1] if class_texts[1] else previous_index
                            class_type = class_texts[2][:3]
                            group = class_texts[3]
                            day = class_texts[4]
                            start_time, end_time = self.get_datetime(class_texts[5])
                            venue = class_texts[6]
                            remark = class_texts[7]

                            # Update previous index
                            previous_index = index

                            # Construct class object
                            c = Class(
                                index=index,
                                class_type=class_type,
                                group=group,
                                day=day,
                                venue=venue,
                                remark=remark,
                                course_code_id=course_code,
                                year=term['year'],
                                semester=term['index'],
                            )

                            # Set time if exists
                            if class_texts[5]:
                                c.start_time = start_time
                                c.end_time = end_time

                            # Save class to database
                            c.save()

                            class_statistics[term['semester']]['saved'] += 1
                            print('  %s added' % (c.__str__(),))
                        except IntegrityError:
                            # IntegrityError happens when unique row already exists in database
                            pass
                        except ValidationError:
                            print('ValidationError %d due to %s' % (j, sys.exc_info()[0],))
                            class_statistics[term['semester']]['missed'] += 1
                        except:
                            print('Failed to extract or save class %d due to %s' % (j, sys.exc_info()[0],))
                            class_statistics[term['semester']]['missed'] += 1

                        # Update class statistics total
                        class_statistics[term['semester']]['total'] += 1

                    course_statistics[term['semester']]['saved'] += 1
        
        print(course_statistics)
        print(class_statistics)
        print('job complete')