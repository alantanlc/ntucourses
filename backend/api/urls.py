from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views
from api.views import SyncViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'exams', views.ExamViewSet)
router.register(r'programmes', views.ProgrammeViewSet)
router.register(r'sync', SyncViewSet, basename='sync')

urlpatterns = [
    path('', include(router.urls)),
]