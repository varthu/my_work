from django.db import models   
import datetime
import time    


class student(models.Model):
	
    student_roll_number = models.AutoField(primary_key=True)
    student_name = models.CharField(max_length=30)
    branch = models.CharField(max_length=30)
    mode_of_admission = models.CharField(max_length=20)
    mobile_number = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    current_address = models.CharField(max_length=30)
    permanent_address = models.CharField(max_length=30)
    father_name = models.CharField(max_length=30)
    father_mobile_number = models.CharField(max_length=30)
    created_dt = models.DateTimeField(default=datetime.datetime.now(),blank=True, null=True)

    class Meta:
        db_table = 'student'

class audit(models.Model):
    
    student_roll_number = models.AutoField(primary_key=True)
    verifying_faculty = models.CharField(max_length=30)
    updated_dt = models.DateTimeField(default=datetime.datetime.now(),blank=True, null=True)

    class Meta:
        db_table = 'audit'