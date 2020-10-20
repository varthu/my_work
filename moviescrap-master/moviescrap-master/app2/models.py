from __future__ import unicode_literals

from django.db import models


# Create your models here.
class movie_details(models.Model):
    movie_id = models.AutoField(primary_key=True)
    movie_name = models.CharField(max_length=70)

    class Meta:
        managed = False
        db_table = 'movie_details'


class soundtrack(models.Model):
    movie_id = models.IntegerField(null=True)
    soundtrack_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=80)
    singer = models.CharField(max_length=500)
    length = models.CharField(max_length=70)


    class Meta:
        managed = False
        db_table = 'soundtrack'
