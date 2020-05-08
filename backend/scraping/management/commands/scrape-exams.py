from django.core.management import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Exam, Course
import datetime
import sys

class Command(BaseCommand):
    help ="collect exams"

    def __init__(self):
        self.p_plan_nos = [101, 102, 5, 6]
        self.semesters = ['1', '2', '3', '4']
        self.plan2semester = {p: s for p, s in zip(self.p_plan_nos, self.semesters)}
        self.year = 2019

    # Define logic of command
    def handle(self, *args, **options):
        # Construct URL request information
        url = 'https://wis.ntu.edu.sg/webexe/owa/exam_timetable_und.Get_detail'
        user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        values = {
            'p_exam_dt': '',
            'p_start_time': '',
            'p_dept': '',
            'p_subj': '',
            'p_venue': '',
            'p_matric': '',
            'academic_session': '',
            'p_plan_no': '',
            'p_exam_yr': '2019',
            'p_semester': '',
            'p_type': 'UE',
            'bOption': 'Next',
        }
        headers = {
            'User-Agent': user_agent,
        }

        # Log number exams found, saved and missed for each semester
        exam_statistics = {}

        # Extract exams for each semester
        for p_plan_no in self.p_plan_nos:
            # Modify p_plan_no in values
            values['p_plan_no'] = p_plan_no

            # Encode values and construct request
            data = urllib.parse.urlencode(values)
            data = data.encode('ascii') # data should be bytes
            req = urllib.request.Request(url, data, headers)

            # Send request
            with urllib.request.urlopen(req) as response:
                # Convert response to soup
                soup = BeautifulSoup(response, 'html.parser')

                # Get all relevant exam tags
                exams = soup.select("td[align='left']")[6:]

                # Get number of exams
                num_of_tags_per_exam = 6
                num_of_exams = len(exams) // num_of_tags_per_exam
                print('%d exams found' % num_of_exams)

                # Initialize count of exams saved for this sem
                exam_statistics[p_plan_no] = {}
                exam_statistics[p_plan_no]['saved'] = 0
                exam_statistics[p_plan_no]['missed'] = 0
                exam_statistics[p_plan_no]['total'] = num_of_exams

                # Extract exam content
                for i in range(num_of_exams):
                    try:
                        # Get list of exam tags and texts
                        index = i*num_of_tags_per_exam
                        exam_tags = exams[index:index+num_of_tags_per_exam]
                        exam_texts = [content.text.strip() for content in exam_tags]

                        # Exam attributes
                        date = datetime.datetime.strptime(exam_texts[0], '%d %B %Y').date()
                        day = exam_texts[1][:3].upper()
                        time = datetime.datetime.strptime(exam_texts[2], '%I.%M %p').time()
                        course_code = exam_texts[3]
                        duration = exam_texts[5]

                        # Save in db
                        Exam.objects.update_or_create(
                            course_code_id=course_code,
                            semester=self.plan2semester[p_plan_no],
                            year=self.year,
                            defaults={
                                'date': date,
                                'day': day,
                                'time': time,
                                'duration': duration,
                            }
                        )

                        exam_statistics[p_plan_no]['saved'] += 1
                        print('%s added' % course_code)
                    except:
                        e = sys.exc_info()
                        print('Failed to extract or save exam %d' % (i,))
                        exam_statistics[p_plan_no]['missed'] += 1

        print(exam_statistics)
        print('job complete')