from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Course

class Command(BaseCommand):
    help = 'collect graduate exams and classes'

    def __init__(self):

        # Academic year and semester parameters
        self.year = '2019'
        self.semesters = ['1', '2', '3']

        # Course statistics
        self.course_statistics = {}

        # Request parameters
        self.url = 'https://wish.wis.ntu.edu.sg/pls/webexe/pgr$subrs_web.examTimetable'
        self.user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        self.headers = {
            'User-Agent': self.user_agent,
            'Cookie': ''
        }
        self.values = {
            'choiceProg': '',
            'choiceSubj': '',
            'choiceSort': '',
            'bOption': 'Next',
            'p1': 'G1902299C',
            'p2': '',
            'sid': '',
            'acadYear': self.year,
            'acadTerm': '1',
            'prdType': 'SEMESTER',
        }

    # Define logic of command
    def handle(self, *args, **options):
        # Extract courses for each semester
        for sem in self.semesters:
            # Modify semester in values
            self.values['acadTerm'] = sem

            # Initialize count of courses saved for this semester
            self.course_statistics[sem] = {}
            self.course_statistics[sem]['saved'] = 0
            self.course_statistics[sem]['missed'] = 0
            self.course_statistics[sem]['total'] = 0

            # Encode values and construct request
            data = urllib.parse.urlencode(self.values)
            data = data.encode('ascii') # data should be bytes
            req = urllib.request.Request(self.url, data, self.headers)
            
            # Retrieve and update cookie in header
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    self.headers['Cookie'] = response.headers._headers[4][1]
                else:
                    print('Unable to retrieve cookie to proceed')
                    return

            # Send request
            with urllib.request.urlopen(req) as response:
                # Convert response to soup
                soup = BeautifulSoup(response, 'html.parser')

                # Get all relevant course tags
                courses = soup.select("td")[11:-5]

                # Get number of courses
                num_of_tags_per_course = 10
                num_of_courses = len(courses) // num_of_tags_per_course
                print('%d courses found' % num_of_courses)

                # Extract course content
                for i in range(num_of_courses):
                    try:
                        # Get list of course tags and texts
                        course_tags = courses[i*num_of_tags_per_course:i*num_of_tags_per_course+num_of_tags_per_course]
                        course_texts = [content.text.strip() for content in course_tags]
                        
                        # Course attributes
                        course_code_id = course_tags[0].select("font")[0].text
                        day = str.replace(course_tags[3].contents[0], '\xa0', ' ').split(' ')[0]
                        start_time = str.replace(course_tags[3].contents[0], '\xa0', ' ').split(' ')[1][:-2]
                        end_time = str.replace(course_tags[3].contents[0], '\xa0', ' ').split(' ')[3][:-2]
                        venue = course_tags[3].contents[2]
                        
                        # Save in db
                        # Course.objects.update_or_create(
                        #     course_code=course_code,
                        #     defaults={
                        #         'title': title,
                        #         'description': description,
                        #         'academic_units': academic_units,
                        #         'grade_type': grade_type,
                        #     }
                        # )
                        
                        self.course_statistics[sem]['saved'] += 1
                        print('%s added' % course_code_id)
                    except:
                        print('Failed to extract or save course %d' % (i,))
                        self.course_statistics[sem]['missed'] += 1
                    
                    # Update total
                    self.course_statistics[sem]['total'] += 1

        print(self.course_statistics)
        print('job complete')