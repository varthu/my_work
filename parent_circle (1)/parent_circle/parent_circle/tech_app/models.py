from django.db import models

# Create your models here.
class test_model(models.Model):
	s_id = models.AutoField(primary_key=True,null=False,blank=True)
	msg = models.CharField(max_length=30)
	detail = models.CharField(max_length=30)
	result = models.CharField(max_length=30)


	class Meta:
		db_table = "test_model"

	 
class test_detail(models.Model):
	name  = models.CharField(max_length=30)
	email = models.CharField(max_length=30)
	phone no = models.IntegerField()
	city = models.CharField(max_length=30)
	state = models.CharField(max_length=30)


	class Meta:
		db_table = "test_detail"

	 