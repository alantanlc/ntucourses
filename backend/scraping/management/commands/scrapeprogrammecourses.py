from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
import sys
from scraping.models import Programme, ProgrammeCourse

from django.db import IntegrityError
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = 'collect graduate courses'

    def __init__(self):

        # Academic year and semester parameters
        self.terms = [
            { 'year': 2020, 'semester': '1', 'index': 1 },
            { 'year': 2019, 'semester': '2', 'index': 2 },
            { 'year': 2019, 'semester': 'S', 'index': 4 },
            { 'year': 2019, 'semester': 'T', 'index': 5 },
        ]

        # Programme types
        self.programme_types = {
            'SD': 'SD',
            'DD': 'DD',
            'MLOAD': 'MI',
            'GERP': 'GE',
            'CNY': 'SP',
            'USP': 'SP',
            'GLOAD': 'UE'
        }

        # Double degree index
        self.double_degree_index = 0

        # Course statistics
        self.mapping_statistics = {}

        # Request parameters
        self.course_url = 'https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1'
        self.programme_code_url = 'https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display'
        self.user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        self.headers = {
            'User-Agent': self.user_agent,
        }
        self.course_url_values = {
            'acadsem': '',
            'r_course_yr': '',
            'r_subj_code': '',
            'boption': 'CLoad',
            'acad': '',
            'semester': '',
        }
        self.programme_code_url_values = {
            'acadsem': '',
            'r_course_yr': '',
            'r_subj_code': '',
            'boption': 'CLoad',
            'acad': '',
            'semester': '',
        }

    def get_programme_type(self, programme_code, index):
        if programme_code.split('-')[0] in self.programme_types:
            return self.programme_types[programme_code.split('-')[0]]
        elif self.double_degree_index == 0 or index < self.double_degree_index:
            return self.programme_types['SD']
        else:
            return self.programme_types['DD']
        
    def get_programme_codes(self, year, sem):
        # Modify semester in values
        self.programme_code_url_values['acadsem'] = '_'.join([str(year), str(sem)])
        self.programme_code_url_values['acad'] = year
        self.programme_code_url_values['semester'] = sem

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
            programmes = soup.select("select[name='r_course_yr']")[0].select("option")

            # Get all programme codes
            codes = [[programme.attrs['value'].replace(';', '-'), programme.next.strip()] for programme in programmes if programme.attrs['value']]

            # Update self.double_degree_index
            self.double_degree_index = next((i for i, code in enumerate(codes) if code[0][:4] == 'ACBS'), 0)

        return codes

    # Define logic of command
    def handle(self, *args, **options):
        
        # Extract courses for each semester
        for term in self.terms:
            # Modify semester in values
            self.course_url_values['acad'] = term['year']
            self.course_url_values['semester'] = term['semester']

            # Get programme codes
            programme_codes = self.get_programme_codes(term['year'], term['semester'])

             # Initialize count of courses saved for this semester
            self.mapping_statistics[term['semester']] = {}
            self.mapping_statistics[term['semester']]['saved'] = 0
            self.mapping_statistics[term['semester']]['missed'] = 0
            self.mapping_statistics[term['semester']]['total'] = 0

            # Extract courses for each programme
            for i, code in enumerate(programme_codes):
                # Modify code in course_url_values
                self.course_url_values['r_course_yr'] = code[0].replace('-', ';')

                try:
                    # Save in db
                    Programme.objects.update_or_create(
                        programme_code=code[0],
                        defaults={
                            'description': code[1],
                            'programme_type': self.get_programme_type(code[0], i)
                        }
                    )
                    print('Programme %s added' % (code[0]))
                except:
                    print('Failed to save programme %s due to %s' % (code[0], sys.exc_info()[0],))
                    pass

                # Encode values and construct request
                data = urllib.parse.urlencode(self.course_url_values)
                data = data.encode('ascii') # data should be bytes
                req = urllib.request.Request(self.course_url, data, self.headers)

                # Send request
                with urllib.request.urlopen(req) as response:
                    # Convert response to soup
                    soup = BeautifulSoup(response, 'html.parser')

                    # Get all relevant course tags
                    courses = soup.select("td[width='100']")
                    courses = [course.text for course in courses if len(course.text) == 6]

                    # Delete all programmecourse in current semester
                    if(len(courses) != 0):
                        ProgrammeCourse.objects.filter(programme_code_id=code, year=term['year'], semester=term['index']).delete()
                    
                    for course in courses:
                        try:
                            prog = ProgrammeCourse(
                                programme_code_id=code[0],
                                course_code_id=course,
                                year=term['year'],
                                semester=term['index']
                            )
                            prog.save()
                            
                            self.mapping_statistics[term['semester']]['saved'] += 1
                            print('%s %s %s %s added' % (code[0], course, term['year'], term['semester']))
                        except IntegrityError:
                            # IntegrityError happens when unique row already exists in database
                            # print('Failed to extract or save mapping %s %s %s %s due to %s' % (code[0], course, term['year'], term['semester'], sys.exc_info()[0],))
                            pass
                        except ValidationError:
                            print('ValidationError %s %s %s %s due to %s' % (code[0], course, term['year'], term['semester'], sys.exc_info()[0],))
                            self.mapping_statistics[term['semester']]['missed'] += 1
                        except:
                            print('Failed to extract or save mapping %s %s %s %s due to %s' % (code[0], course, term['year'], term['semester'], sys.exc_info()[0],))
                            self.mapping_statistics[term['semester']]['missed'] += 1
                        
                        # Update total
                        self.mapping_statistics[term['semester']]['total'] += 1

        print(self.mapping_statistics)
        print('job complete')