from scraping.models import Course, Venue, Class, Exam, Programme
from api.serializers import CourseSerializer, CourseDetailSerializer, ExamSerializer, ClassSerializer, ProgrammeSerializer
from rest_framework import viewsets, pagination
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import status
from api.pagination import StandardResultsSetPagination
from rest_framework.decorators import api_view

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing or retrieving courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = StandardResultsSetPagination

    # Course List
    def list(self, request):
        # Get queryset
        queryset = self.get_queryset()

        # Year filter
        if 'year' in request.query_params.keys() and request.query_params['year'].isdigit():
            year = request.query_params['year']
            queryset = queryset.filter(classes__year=year).distinct('course_code')

        # Semester filter
        if 'sem' in request.query_params.keys():
            sem = [int(s) for s in request.query_params['sem'].split(',') if s.isdigit()]
            queryset = queryset.filter(classes__semester__in=sem).distinct('course_code')

        # Search keyword filter
        if 'search' in request.query_params.keys():
            queryset = queryset.filter(
                Q(course_code__icontains=request.query_params['search']) | 
                Q(title__icontains=request.query_params['search']) | 
                Q(description__icontains=request.query_params['search'])
            )

        # Academic units filter
        if 'au' in request.query_params.keys():
            try:
                aus = [float(a) for a in request.query_params['au'].split(',')]
                queryset = queryset.filter(academic_units__in=aus)
            except:
                pass

        # Grade type filter
        if 'pass_fail' in request.query_params.keys():
            grade_type = True if request.query_params['pass_fail'].lower() == 'true' else False
            queryset = queryset.filter(grade_type=grade_type)

        # Exams filter
        if 'no_exam' in request.query_params.keys():
            no_exam = True if request.query_params['no_exam'].lower() == 'true' else False

            if 'sem' in request.query_params.keys():
                if no_exam:
                    queryset = queryset.exclude(exams__semester__in=sem)
                else:
                    queryset = queryset.filter(exams__semester__in=sem)
            else:
                queryset = queryset.filter(exams__isnull=no_exam)

        # Online filter
        if 'online' in request.query_params.keys():
            online = True if request.query_params['online'].lower() == 'true' else False
            queryset = queryset.filter(
                Q(description__icontains='online course') |
                Q(description__icontains='online learning') |
                Q(description__icontains='online discussion') |
                Q(description__icontains='online lecture') |
                Q(description__icontains='online assignment') |
                Q(classes__remark__icontains='online') |
                Q(classes__venue__icontains='online')
            ).distinct('course_code')
        
        # Programmes filter
        if 'prog' in request.query_params.keys():
            programme = [p for p in request.query_params['prog'].split(',') if p]
            queryset = queryset.filter(programmes__programme_code__in=programme).distinct('course_code')

        # Order by course code
        queryset = queryset.order_by('course_code')

        # Paginate result
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return Response(serializer.data)

    # Course Detail
    def retrieve(self, request, pk=None):
        # Get queryset
        queryset = self.get_queryset()
        course = get_object_or_404(queryset, pk=pk)
        serializer = CourseDetailSerializer(course, context={'request': request})
        return Response(serializer.data)

class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing or retrieving exams.
    """
    queryset = Exam.objects.all().order_by('-year', '-semester', 'date', 'time', 'course_code')
    serializer_class = ExamSerializer
    pagination_class = StandardResultsSetPagination

class ProgrammeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing or retrieving programmes.
    """
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer

    # Programme list
    def list(self, request):
        # Get queryset
        queryset = self.get_queryset()

        # Programme type filter
        if 'type' in request.query_params.keys():
            programme_type = request.query_params['type'].upper()
            queryset = queryset.filter(programme_type=programme_type)

        serializer = ProgrammeSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def scrape_courses(request):
    return Response(status=status.HTTP_200_OK)