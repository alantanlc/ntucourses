from django.db import models

class BaseModel(models.Model):
    created_datetime = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=20, default='SYSTEM')
    last_updated_datetime = models.DateTimeField(auto_now=True)
    last_updated_by = models.CharField(max_length=20, default='SYSTEM')

    class Meta:
        abstract = True

class Course(BaseModel):
    course_code = models.CharField(max_length=6, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    academic_units = models.FloatField()
    
    # prerequisite = models.CharField(max_length=1000, blank=True)
    # mutually_exclusive_with = models.CharField(max_length=1000, blank=True)
    # not_available_to_programme = models.CharField(max_length=1000, blank=True)
    # not_available_to_all_programme_with = models.CharField(max_length=1000, blank=True)
    # not_available_as_core_to_programme = models.CharField(max_length=1000, blank=True)
    # not_available_as_pe_to_programme = models.CharField(max_length=1000, blank=True)
    # not_available_as_ue_to_programme = models.CharField(max_length=1000, blank=True)

    prerequisite = models.TextField(blank=True)
    mutually_exclusive_with = models.TextField(blank=True)
    not_available_to_programme = models.TextField(blank=True)
    not_available_to_all_programme_with = models.TextField(blank=True)
    not_available_as_core_to_programme = models.TextField(blank=True)
    not_available_as_pe_to_programme = models.TextField(blank=True)
    not_available_as_ue_to_programme = models.TextField(blank=True)
    
    grade_type = models.BooleanField(default=False)

    def __str__(self):
        return self.course_code

    class Meta:
        ordering = ['course_code']

    class Admin:
        pass