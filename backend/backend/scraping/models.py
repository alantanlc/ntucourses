from django.db import models

class Course(models.Model):
    course_code = models.CharField(max_length=6, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    academic_units = models.FloatField()
    created_datetime = models.DateTimeField(auto_now_add=True)
    last_updated_datetime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

    class Admin:
        pass