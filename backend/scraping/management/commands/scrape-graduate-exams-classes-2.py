from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
import json
import urllib.parse
import urllib.request
from django.utils import timezone
from scraping.models import Course, Class, Exam

class Command(BaseCommand):
    help = 'collects graduate exams and classes for the current term'

    def __init__(self):
        # Statistics
        self.class_statistics = {
            'saved': 0,
            'missed': 0,
            'total': 0
        }

        # Request parameters
        self.options_url = 'https://wish.wis.ntu.edu.sg/pls/webexe/pgr$subrs_timetable.mmenu'
        self.content_url = 'https://wish.wis.ntu.edu.sg/pls/webexe/pgr$subrs_timetable.examTimetable'
        self.user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
        self.headers = {
            'User-Agent': self.user_agent,
        }
        self.content_values = {
            'choiceProg': '',
            'choiceSubj': '',
            'choiceSort': '',
            'bOption': 'Next'
        }

    # Define logic of command
    def handle(self, *args, **options):
        # Get list of choiceProg options
        req = urllib.request.Request(self.options_url, headers=self.headers)

        # Get options
        with urllib.request.urlopen(req) as response:
            soup = BeautifulSoup(response, 'html.parser')
            options = [option.attrs['value'] for option in soup.select("select")[0].select("option[value]")]

        # Return if no options
        if not options:
            print('No options found')
            return

        # For each option, get class and exam
        for option in options:
            self.content_values['choiceProg'] = option
            data = urllib.parse.urlencode(self.content_values)
            data = data.encode('ascii')
            req = urllib.request.Request(self.content_url, data, self.headers)

            with urllib.request.urlopen(req) as response:
                soup = BeautifulSoup(response, 'html.parser')
                classes = soup.select("td[bgcolor]")
                num_of_tags_per_class = 9
                num_of_classes = len(classes) // num_of_tags_per_class
                print('%d classes found' % num_of_classes)

                # Extract class content
                for i in range(num_of_classes):
                    try:
                        class_tags = classes[i*num_of_tags_per_class:i*num_of_tags_per_class+num_of_tags_per_class]
                        class_texts = class_tags[2].text.strip().replace('\xa0', ' ').replace('am', 'am ').replace('pm', 'pm ').replace('Commence', '').split(' ')
                        exam_texts = class_tags[3].text.replace('(', '').replace(')', ' ').split(' ')

                        # Course code id
                        course_code_id = class_tags[0].select("font")[0].text.replace('#', '')

                        # Pass if no class info available
                        if len(class_texts) <= 1:
                            pass

                        # Class attributes
                        day = class_texts[0][:3].upper()
                        start_time = class_texts[1]
                        end_time = class_texts[4]
                        venue = class_texts[5]

                        # Construct class object
                        c = Class(
                            day=day,
                            venue=venue,
                            course_code_id=course_code_id,
                            year=2019,
                            semester=2,
                            start_time=start_time,
                            end_time=end_time,
                        )

                        # Save class
                        c.save()

                        # Exam attributes
                        # if len(exam_texts) == 3:
                        #     date = exam_texts[0]
                        #     exam_day = exam_texts[1].upper()
                        #     exam_time = exam_texts[2].split('-')[0]
                        #     exam_duration = 0

                        self.class_statistics['saved'] += 1
                        print('%s added' % course_code_id)
                    except:
                        print('Failed to extract or save class %d' % i)
                        self.class_statistics['missed'] += 1

                    # Update total
                    self.class_statistics['total'] += 1

        print(self.class_statistics)
        print('job complete')  