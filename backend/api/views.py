from scraping.models import Course, Venue, Class, Exam
from api.serializers import CourseSerializer, CourseDetailSerializer, ExamSerializer, ClassSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for listing or retrieving courses.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    # Course List
    def list(self, request):
        # Get queryset
        queryset = self.get_queryset()

        # Year filter (note: filtering by year+semester introduces a significant delay)
        if 'year' in request.query_params.keys() and request.query_params['year'].isdigit():
            year = request.query_params['year']
            queryset = queryset.filter(classes__year=year).distinct()

        # Semester filter
        if 'sem' in request.query_params.keys():
            sem = [int(s) for s in request.query_params['sem'].split(' ') if s.isdigit()]
            queryset = queryset.filter(classes__semester__in=sem).distinct()

        # Search keyword filter
        if 'search' in request.query_params.keys():
            queryset = queryset.filter(
                Q(course_code__icontains=request.query_params['search']) | 
                Q(title__icontains=request.query_params['search']) | 
                Q(description__icontains=request.query_params['search'])
            )

        # Academic units filter
        if 'au' in request.query_params.keys():
            aus = [int(a) for a in request.query_params['au'].split(' ') if a.isdigit()]
            queryset = queryset.filter(academic_units__in=aus)

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
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Exam.objects.all().order_by('-year', '-semester', 'date', 'time', 'course_code')
    serializer_class = ExamSerializer