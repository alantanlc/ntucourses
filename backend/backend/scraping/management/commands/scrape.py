from django.core.management.base import BaseCommand

from bs4 import BeautifulSoup
import json

import urllib.parse
import urllib.request

from django.utils import timezone

from scraping.models import Course

import sys

class Command(BaseCommand):
    help = "collect courses"

    def __init__(self):
        self.keywords = {}
        self.keywords['prereq'] = 'Prerequisite:'
        self.keywords['mutual'] = 'Mutually exclusive with:'
        self.keywords['na_prog'] = 'Not available to Programme:'
        self.keywords['na_all_prog'] = 'Not available to all Programme with:'
        self.keywords['na_core'] = 'Not available as Core to Programme:'
        self.keywords['na_pe'] = 'Not available as PE to Programme:'
        self.keywords['na_ue'] = 'Not available as UE to Programme:'
        self.keywords['grade'] = 'Grade Type:'

    def get_prerequisite_text(self, course_texts):
        prereq_texts = []
        if self.keywords['prereq'] in course_texts:
            prereq_index = course_texts.index(self.keywords['prereq'])
            for text in course_texts[prereq_index+1:-1]:
                if text in self.keywords.values():
                    if text == self.keywords['prereq']:
                        pass
                    else:
                        break
                elif text:
                    prereq_texts.append(text)
        return ' '.join(prereq_texts)

    # Define logic of command
    def handle(self, *args, **options):
        # Construct URL request information
        url = 'https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1'
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

        # Extract courses for each semester
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

                # Get all relevant course tags
                courses = soup.select("td[width],font[color='#FF00FF'],font[color='BROWN'],font[color='GREEN'],font[color='RED']")[4:]
                course_start_indices = [i-1 for i, course in enumerate(courses) if '400' in course.attrs.values()]

                # Get number of courses
                num_of_courses = len(course_start_indices)
                print('%d courses found' % num_of_courses)

                # Initialize count of courses saved for this semester
                course_statistics[sem] = {}
                course_statistics[sem]['saved'] = 0
                course_statistics[sem]['missed'] = 0
                course_statistics[sem]['total'] = num_of_courses

                # Extract course content
                for i, index in enumerate(course_start_indices):
                    try:
                        # Get list of course tags and texts
                        course_tags = courses[index:course_start_indices[i+1]] if i < len(course_start_indices) - 1 else courses[index:]
                        course_texts = [content.text.strip() for content in course_tags if content.text.strip()]
                        
                        # Course attributes
                        course_code = course_texts[0]
                        title = course_texts[1]
                        description = course_texts[-1]
                        academic_units = course_texts[2]
                        prereq = self.get_prerequisite_text(course_texts)
                        mutual = course_texts[course_texts.index(self.keywords['mutual'])+1] if self.keywords['mutual'] in course_texts else ''
                        na_prog = course_texts[course_texts.index(self.keywords['na_prog'])+1] if self.keywords['na_prog'] in course_texts else ''
                        na_all_prog = course_texts[course_texts.index(self.keywords['na_all_prog'])+1] if self.keywords['na_all_prog'] in course_texts else ''
                        na_core = course_texts[course_texts.index(self.keywords['na_core'])+1] if self.keywords['na_core'] in course_texts else ''
                        na_pe = course_texts[course_texts.index(self.keywords['na_pe'])+1] if self.keywords['na_pe'] in course_texts else ''
                        na_ue = course_texts[course_texts.index(self.keywords['na_ue'])+1] if self.keywords['na_ue'] in course_texts else ''
                        grade_type = True if self.keywords['grade'] in course_texts else False

                        # # Save in db
                        Course.objects.update_or_create(
                            course_code=course_code,
                            defaults={
                                'title': title,
                                'description': description,
                                'academic_units': academic_units,
                                'prerequisite': prereq,
                                'mutually_exclusive_with': mutual,
                                'not_available_to_programme': na_prog,
                                'not_available_to_all_programme_with': na_all_prog,
                                'not_available_as_core_to_programme': na_core,
                                'not_available_as_pe_to_programme': na_pe,
                                'not_available_as_ue_to_programme': na_ue,
                                'grade_type': grade_type,
                            }
                        )
                        
                        course_statistics[sem]['saved'] += 1
                        print('%s added' % course_code)
                    except:
                        print('Failed to extract or save course %d' % (i,))
                        course_statistics[sem]['missed'] += 1

        print(course_statistics)
        print('job complete')