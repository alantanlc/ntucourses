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
    course_code = models.CharField(max_length=6, primary_key=True)
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

# class Venue(BaseModel):
#     facility = models.CharField(max_length=20, unique=True)
#     location = models.CharField(max_length=20) # Formatted as BLOCK-LEVEL-UNIT, e.g. NS4-05-79
#     lat = models.FloatField(blank=True)
#     lng = models.FloatField(blank=True)
    
class Class(BaseModel):

    CLASS_TYPE = (
        ('LEC', 'Lecture'),
        ('TUT', 'Tutorial'),
        ('LAB', 'Laboratory'),
        ('SEM', 'Seminar'),
        ('PRJ', 'Project'),
        ('DES', 'Design')
    )

    DAY = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    )

    class_type = models.CharField(max_length=3, choices=CLASS_TYPE, blank=True)
    group = models.CharField(max_length=6, blank=True)
    day = models.CharField(max_length=3, choices=DAY, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    # venue = models.ForeignKey(Venue, on_delete=models.SET_NULL, null=True)
    venue = models.CharField(max_length=20, blank=True)
    remark = models.CharField(max_length=100, blank=True)

    course_code = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['class_type', 'group', 'day', 'start_time', 'end_time', 'venue', 'remark', 'course_code', 'year', 'semester'], name='unique_class')
        ]

    def __str__(self):
        return f'{self.class_type}, {self.group}, {self.day}, {self.start_time}, {self.end_time}, {self.venue}, {self.remark}, {self.course_code}, {self.year}, {self.semester}'

class Exam(BaseModel):

    DAY = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    )

    date = models.DateField(null=False, blank=False)
    day = models.CharField(max_length=3, choices=DAY, blank=False)
    time = models.TimeField(null=False, blank=False)
    duration = models.FloatField(blank=False)
    course_code = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['course_code', 'year', 'semester'], name='unique_exam')
        ]

    def __str__(self):
        return f'{self.course_code}, {self.year}, {self.semester}, {self.date}, {self.day}, {self.time}, {self.duration}'