from scraping.models import Course, Venue, Class, Exam
from rest_framework import serializers

class FilteredListSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        data = data.filter(year=2019)
        return super(FilteredListSerializer, self).to_representation(data)

class ExamSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        # list_serializer_class = FilteredListSerializer
        model = Exam
        fields = ['date', 'day', 'time', 'duration', 'year', 'semester']

class ClassSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        # list_serializer_class = FilteredListSerializer
        model = Class
        fields = ['index', 'class_type', 'group', 'day', 'start_time', 'end_time', 'venue', 'remark', 'year', 'semester']

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    
    exams = ExamSerializer(many=True)
    
    class Meta:
        model = Course
        fields = [
            'course_code', 
            'title', 
            'description',
            'academic_units',
            'prerequisite',
            'mutually_exclusive_with',
            'not_available_to_programme',
            'not_available_to_all_programme_with',
            'not_available_as_core_to_programme',
            'not_available_as_pe_to_programme',
            'not_available_as_ue_to_programme',
            'grade_type',
            'exams', 
            'url'
        ]

class CourseDetailSerializer(serializers.HyperlinkedModelSerializer):
    
    exams = ExamSerializer(many=True)
    classes = ClassSerializer(many=True)
    
    class Meta:
        model = Course
        fields = [
            'course_code', 
            'title', 
            'description',
            'academic_units',
            'prerequisite',
            'mutually_exclusive_with',
            'not_available_to_programme',
            'not_available_to_all_programme_with',
            'not_available_as_core_to_programme',
            'not_available_as_pe_to_programme',
            'not_available_as_ue_to_programme',
            'grade_type',
            'exams', 
            'classes',
        ]