
from scraping.models import Course, Venue, Class, Exam
from rest_framework import viewsets, permissions, generics
from api.serializers import CourseSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
import django_filters as df

class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Course.objects.all().order_by('course_code')
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]

class CourseList(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['course_code', 'title', 'description']
    filterset_fields = ['academic_units']
    # permission_classes = [permissions.IsAuthenticated]