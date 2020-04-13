
from scraping.models import Course, Venue, Class, Exam
from api.serializers import CourseSerializer, CourseDetailSerializer, ExamSerializer, ClassSerializer
from rest_framework import viewsets, filters, generics
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.response import Response
from django.shortcuts import get_object_or_404, get_list_or_404

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Course.objects.all().order_by('course_code')
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['course_code', 'title', 'description']
    filterset_fields = ['academic_units', 'grade_type']

    # Overwrite retrieve method to use a different serializer for course-detail view
    def retrieve(self, request, pk=None):
        queryset = Course.objects.all()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseDetailSerializer(course, context={'request': request})
        return Response(serializer.data)

class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Exam.objects.all().order_by('-year', '-semester', 'date', 'time', 'course_code')
    serializer_class = ExamSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['course_code', 'date', 'time', 'year', 'semester']

class ClassViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Class.objects.all().order_by('course_code', '-semester', 'class_type', 'group')
    serializer_class = ClassSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['course_code', 'class_type', 'group', 'day', 'venue', 'year', 'semester']