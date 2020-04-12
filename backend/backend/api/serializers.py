from scraping.models import Course, Venue, Class, Exam
from rest_framework import serializers

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['course_code', 'title', 'description', 'academic_units', 'prerequisite']