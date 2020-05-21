from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class BaseModel(models.Model):

    # Fields
    created_datetime = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length=20, default='SYSTEM')
    last_updated_datetime = models.DateTimeField(auto_now=True)
    last_updated_by = models.CharField(max_length=20, default='SYSTEM')

    # Metadata
    class Meta:
        abstract = True

class Day(models.Model):

    # Choices
    DAY = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    )

class Course(BaseModel):

    # Fields
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

    # Metadata
    class Meta:
        ordering = ['course_code']

    # Methods
    def __str__(self):
        return f'{self.course_code}, {self.title}'

class Programme(BaseModel):

    # Choices
    PROGRAMME_TYPE = (
        ('SD', 'Single Degree'),
        ('DD', 'Double Degree'),
        ('MI', 'Minor'),
        ('GE', 'General Education'),
        ('SP', 'Scholars'),
        ('UE', 'Unrestricted Electives'),
    )

    # Fields
    programme_code = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=200)
    programme_type = models.CharField(max_length=2, choices=PROGRAMME_TYPE)

    # Metadata
    class Meta:
        ordering = ['programme_code', 'description']

    # Methods
    def __str__(self):
        return f'{self.programme_code}, {self.description}'

class ProgrammeCourse(BaseModel):

    # Fields
    programme_code = models.ForeignKey(Programme, on_delete=models.CASCADE)
    course_code = models.ForeignKey(Course, related_name='programmes', on_delete=models.CASCADE)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    # Metadata
    class Meta:
        ordering = ['programme_code', 'course_code', '-year', '-semester']
        constraints = [
            models.UniqueConstraint(fields=['programme_code', 'course_code', 'year', 'semester'], name='unique_programme_course')
        ]

    # Methods
    def __str__(self):
        return f'{self.programme_code}, {self.course_code}'

class Venue(BaseModel):

    # Choices
    VENUE_TYPE = (
        ('LT', 'Lecture Theatre'),
        ('LIB', 'Library'),
        ('EH', 'Examination Hall'),
        ('MR', 'Meeting Room'),
        ('RR', 'Reading Room'),
        ('SR', 'Seminar Room'),
        ('TR', 'Tutorial Room'),
        ('TR+', 'Tutorial Room +'),
        ('LAB', 'Laboratory'),
    )

    # Fields
    name = models.CharField(max_length=200, unique=True) # e.g. Seminar Room 17 at NBS-S4 (name is used as query on maps.ntu.edu.sg)
    unit = models.CharField(max_length=100) # Formatted as BLOCK-LEVEL-NUMBER, e.g. NS4-05-79 (a small handful of venues do not have a proper unit number in this format)
    venue_type = models.CharField(max_length=3, choices=VENUE_TYPE)
    lat = models.FloatField()
    lng = models.FloatField()

    # Metadata
    class Meta:
        ordering = ['name']

    # Methods
    def __str__(self):
        return f'{self.name}, {self.unit}'

class Class(BaseModel):

    # Choices
    CLASS_TYPE = (
        ('LEC', 'Lecture'),
        ('TUT', 'Tutorial'),
        ('LAB', 'Laboratory'),
        ('SEM', 'Seminar'),
        ('PRJ', 'Project'),
        ('DES', 'Design')
    )

    # Fields
    index = models.CharField(max_length=6, blank=True)
    class_type = models.CharField(max_length=3, choices=CLASS_TYPE, blank=True)
    group = models.CharField(max_length=6, blank=True)
    day = models.CharField(max_length=3, choices=Day.DAY, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    venue = models.CharField(max_length=20, blank=True)
    remark = models.CharField(max_length=100, blank=True)
    course_code = models.ForeignKey(Course, related_name='classes', on_delete=models.CASCADE)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    # Metadata
    class Meta:
        ordering = ['course_code', '-year', '-semester', 'index', 'class_type', 'group', 'day', 'start_time', 'end_time']
        constraints = [
            models.UniqueConstraint(fields=['index', 'class_type', 'group', 'day', 'start_time', 'end_time', 'venue', 'remark', 'course_code', 'year', 'semester'], name='unique_class')
        ]

    # Methods
    def __str__(self):
        return f'{self.index}, {self.class_type}, {self.group}, {self.day}, {self.start_time}, {self.end_time}, {self.venue}, {self.remark}, {self.course_code}, {self.year}, {self.semester}'

class Exam(BaseModel):

    # Fields
    date = models.DateField()
    day = models.CharField(max_length=3, choices=Day.DAY)
    time = models.TimeField()
    duration = models.FloatField()
    course_code = models.ForeignKey(Course, related_name='exams', on_delete=models.CASCADE)
    year = models.PositiveIntegerField(validators=[MinValueValidator(2019), MaxValueValidator(9999)])
    semester = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    # Metadata
    class Meta:
        ordering = ['course_code', '-year', '-semester', 'date', 'time']
        constraints = [
            models.UniqueConstraint(fields=['course_code', 'year', 'semester'], name='unique_exam')
        ]

    # Methods
    def __str__(self):
        return f'{self.course_code}, {self.year}, {self.semester}, {self.date}, {self.day}, {self.time}, {self.duration}'