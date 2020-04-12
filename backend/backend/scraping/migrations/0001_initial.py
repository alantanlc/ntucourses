# Generated by Django 3.0.4 on 2020-04-07 16:58

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('created_datetime', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(default='SYSTEM', max_length=20)),
                ('last_updated_datetime', models.DateTimeField(auto_now=True)),
                ('last_updated_by', models.CharField(default='SYSTEM', max_length=20)),
                ('course_code', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('academic_units', models.FloatField()),
                ('prerequisite', models.TextField(blank=True)),
                ('mutually_exclusive_with', models.TextField(blank=True)),
                ('not_available_to_programme', models.TextField(blank=True)),
                ('not_available_to_all_programme_with', models.TextField(blank=True)),
                ('not_available_as_core_to_programme', models.TextField(blank=True)),
                ('not_available_as_pe_to_programme', models.TextField(blank=True)),
                ('not_available_as_ue_to_programme', models.TextField(blank=True)),
                ('grade_type', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['course_code'],
            },
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_datetime', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(default='SYSTEM', max_length=20)),
                ('last_updated_datetime', models.DateTimeField(auto_now=True)),
                ('last_updated_by', models.CharField(default='SYSTEM', max_length=20)),
                ('class_type', models.CharField(blank=True, choices=[('LEC', 'Lecture'), ('TUT', 'Tutorial'), ('LAB', 'Laboratory'), ('SEM', 'Seminar')], max_length=3)),
                ('group', models.CharField(blank=True, max_length=6)),
                ('day', models.CharField(blank=True, choices=[('MON', 'Monday'), ('TUE', 'Tuesday'), ('WED', 'Wednesday'), ('THU', 'Thursday'), ('FRI', 'Friday'), ('SAT', 'Saturday'), ('SUN', 'Sunday')], max_length=3)),
                ('start_time', models.TimeField(blank=True, null=True)),
                ('end_time', models.TimeField(blank=True, null=True)),
                ('venue', models.CharField(blank=True, max_length=20)),
                ('remark', models.CharField(blank=True, max_length=100)),
                ('year', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(2019), django.core.validators.MaxValueValidator(9999)])),
                ('semester', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(4)])),
                ('course_code', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='scraping.Course')),
            ],
        ),
        migrations.AddConstraint(
            model_name='class',
            constraint=models.UniqueConstraint(fields=('class_type', 'group', 'day', 'start_time', 'end_time', 'venue', 'remark', 'course_code', 'year', 'semester'), name='unique_class'),
        ),
    ]