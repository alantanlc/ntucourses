from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Course

class Command(BaseCommand):
    help = 'collect graduate courses'

    def __init__(self):

        # Academic year and semester parameters
        self.year = '2019'
        self.semesters = ['1', '2', '3']

        # Course statistics
        self.course_statistics = {}

        # Request parameters
        self.course_url = 'https://wis.ntu.edu.sg/pls/webexe88/pgr$query_subject_content.display_content_load'
        self.programme_code_url = 'https://wis.ntu.edu.sg/pls/webexe88/pgr$query_subject_content.display'
        self.user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        self.headers = {
            'User-Agent': self.user_agent,
        }
        self.course_url_values = {
            's_acad': '',
            's_course': '',
            'bOption': '',
            's_search': '',
        }
        self.programme_code_url_values = {
            'in_acad': '',
        }
        
    def get_programme_codes(self, year, sem):
        # Modify semester in values
        self.programme_code_url_values['in_acad'] = year + sem

        # Encode values and construct request
        data = urllib.parse.urlencode(self.programme_code_url_values)
        data = data.encode('ascii') # data should be bytes
        req = urllib.request.Request(self.programme_code_url, data, self.headers)

        # Send request
        codes = []
        with urllib.request.urlopen(req) as response:
            # Convert response to soup
            soup = BeautifulSoup(response, 'html.parser')

            # Get all relevant programme tags
            programmes = soup.select("select[name='s_course']")[0].select("option")[1:]

            # Get all programme codes
            codes = [programme.attrs['value'] for programme in programmes]
        return codes

    # Define logic of command
    def handle(self, *args, **options):
        
        # Extract courses for each semester
        for sem in self.semesters:
            # Modify semester in values
            self.course_url_values['s_acad'] = self.year + sem

            # Get programme codes
            programme_codes = self.get_programme_codes(self.year, sem)

             # Initialize count of courses saved for this semester
            self.course_statistics[sem] = {}
            self.course_statistics[sem]['saved'] = 0
            self.course_statistics[sem]['missed'] = 0
            self.course_statistics[sem]['total'] = 0

            # Extract courses for each programme
            for code in programme_codes:
                # Modify code in course_url_values
                self.course_url_values['s_course'] = code

                # Encode values and construct request
                data = urllib.parse.urlencode(self.course_url_values)
                data = data.encode('ascii') # data should be bytes
                req = urllib.request.Request(self.course_url, data, self.headers)

                # Send request
                with urllib.request.urlopen(req) as response:
                    # Convert response to soup
                    soup = BeautifulSoup(response, 'html.parser')

                    # Get all relevant course tags
                    courses = soup.select("font[size='2']")[1:]
                    course_start_indices = [0] + [i+1 for i, course in enumerate(courses) if 'color' not in course.attrs.keys()][:-1]

                    # Get number of courses
                    num_of_courses = len(course_start_indices)
                    print('%d courses found' % num_of_courses)

                    # Extract course content
                    for i, index in enumerate(course_start_indices):
                        try:
                            # Get list of course tags and texts
                            course_tags = courses[index:course_start_indices[i+1]] if i < len(course_start_indices) - 1 else courses[index:]
                            course_texts = [content.text.strip() for content in course_tags] # must include tags with empty texts as some course description might be empty
                            
                            # Course attributes
                            course_code = course_texts[0]
                            title = course_texts[1]
                            description = course_texts[-1]
                            academic_units = course_texts[2][:-2] if course_texts[2][:-2] else 0
                            grade_type = True if len(course_texts) > 4 and course_texts[3] == 'Pass/Fail Grade' else False
                           
                            # Save in db
                            Course.objects.update_or_create(
                                course_code=course_code,
                                defaults={
                                    'title': title,
                                    'description': description,
                                    'academic_units': academic_units,
                                    'grade_type': grade_type,
                                }
                            )
                            
                            self.course_statistics[sem]['saved'] += 1
                            print('%s added' % course_code)
                        except:
                            print('Failed to extract or save course %d' % (i,))
                            self.course_statistics[sem]['missed'] += 1
                        
                        # Update total
                        self.course_statistics[sem]['total'] += 1

        print(self.course_statistics)
        print('job complete')