from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

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
    prerequisite = models.TextField(blank=True)
    mutually_exclusive_with = models.TextField(blank=True)
    not_available_to_programme = models.TextField(blank=True)
    not_available_to_all_programme_with = models.TextField(blank=True)
    not_available_as_core_to_programme = models.TextField(blank=True)
    not_available_as_pe_to_programme = models.TextField(blank=True)
    not_available_as_ue_to_programme = models.TextField(blank=True)
    grade_type = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.course_code}, {self.title}'

    class Meta:
        ordering = ['course_code']

    class Admin:
        pass

# class Venue(BaseModel):
#     facility = models.CharField(max_length=20, unique=True)
#     location = models.CharField(max_length=20) # Formatted as BLOCK-LEVEL-UNIT, e.g. NS4-05-79
#     lat = models.FloatField(blank=True)
#     lng = models.FloatField(blank=True)
    
class Class(BaseModel):

    CLASS_TYPE = (
        ('lec', 'Lecture'),
        ('tut', 'Tutorial'),
        ('lab', 'Laboratory'),
        ('sem', 'Seminar'),
    )

    DAY = (
        ('mon', 'Monday'),
        ('tue', 'Tuesday'),
        ('wed', 'Wednesday'),
        ('thu', 'Thursday'),
        ('fri', 'Friday'),
        ('sat', 'Saturday'),
        ('sun', 'Sunday'),
    )

    class_type = models.CharField(max_length=3, choices=CLASS_TYPE, blank=True)
    group = models.CharField(max_length=6, blank=True)
    day = models.CharField(max_length=3, choices=DAY, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    # venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True)
    venue = models.CharField(max_length=20, blank=True)
    remark = models.CharField(max_length=50, blank=True)

    course_code = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    class Meta:
        ordering = ['course_code', '-year', '-semester']