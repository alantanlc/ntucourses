from django.core.management.base import BaseCommand

from bs4 import BeautifulSoup
import json

import urllib.parse
import urllib.request

from django.utils import timezone

from scraping.models import Course

class Command(BaseCommand):
    help = "collect courses"

    # List of keywords
    keywords = {}
    keywords['prereq'] = 'Prerequisite:'
    keywords['mutual'] = 'Mutually exclusive with:'
    keywords['na_prog'] = 'Not available to Programme:'
    keywords['na_all_prog'] = 'Not available to all Programme with:'
    keywords['na_core'] = 'Not available as Core to Programme:'
    keywords['na_pe'] = 'Not available as PE to Programme:'
    keywords['na_ue'] = 'Not available as UE to Programme:'
    keywords['grade'] = 'Grade Type:'

    # Define logic of command
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
                course_start_indices = [0] + [i+1 for i, course in enumerate(courses[:-1]) if '650' in course.attrs.values()]

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
                        course_texts = [content.text.strip() for content in course_tags]
                        
                        # Course attributes
                        course_code = course_texts[0]
                        title = course_texts[1]
                        description = course_texts[-1]
                        academic_units = course_texts[2]
                        prereq = course_texts[course_texts.index('Prerequisite:')+1] if 'Prerequisite:' in course_texts else ''
                        mutual = course_texts[course_texts.index('Mutually exclusive with:')+1] if 'Mutually exclusive with:' in course_texts else ''
                        na_prog = course_texts[course_texts.index('Not available to Programme:')+1] if 'Not available to Programme:' in course_texts else ''
                        na_all_prog = course_texts[course_texts.index('Not available to all Programme with:')+1] if 'Not available to all Programme with:' in course_texts else ''
                        na_core = course_texts[course_texts.index('Not available as Core to Programme:')+1] if 'Not available as Core to Programme:' in course_texts else ''
                        na_pe = course_texts[course_texts.index('Not available as PE to Programme:')+1] if 'Not available as PE to Programme:' in course_texts else ''
                        na_ue = course_texts[course_texts.index('Not available as UE to Programme:')+1] if 'Not available as UE to Programme:' in course_texts else ''
                        grade_type = True if 'Grade Type:' in course_texts else False

                        # # Save in db
                        Course.objects.update_or_create(
                            course_code=course_code,
                            title=title,
                            description=description,
                            academic_units=academic_units,
                            prerequisite=prereq,
                            mutually_exclusive_with=mutual,
                            not_available_to_programme=na_prog,
                            not_available_to_all_programme_with=na_all_prog,
                            not_available_as_core_to_programme=na_core,
                            not_available_as_pe_to_programme=na_pe,
                            not_available_as_ue_to_programme=na_ue,
                            grade_type=grade_type,
                        )
                        
                        course_statistics[sem]['saved'] += 1
                        print('%s added' % course_code)
                    except:
                        print('Failed to extract or save course %d' % (i,))
                        course_statistics[sem]['missed'] += 1

        print(course_statistics)
        print('job complete')