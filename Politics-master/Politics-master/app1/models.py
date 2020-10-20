# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class districts(models.Model):
    district_id = models.IntegerField(primary_key=True)
    district_name = models.CharField(max_length=70)
    class Meta:
       managed = False
       db_table = 'districts'

class constituents(models.Model):
	constituent_id = models.AutoField(primary_key=True)
	constituent_name = models.CharField(max_length=80)
	district_id = models.IntegerField()

	class Meta:
		managed = False
		db_table = 'constituents'


class parties(models.Model):
	party_id = models.AutoField(primary_key= True)
	party_symbol  = models.CharField(max_length=80)
	party_started = models.DateField()
	started_leader = models.CharField(max_length=60)
	current_leader = models.CharField(max_length=70)
	party_name = models.CharField(max_length=60)

	class Meta:
		managed = False
		db_table = 'parties'		


class party_member(models.Model):
	member_name = models.CharField(max_length=70)
	member_age = models.IntegerField()
	constituent_id  = models.IntegerField()
	party_id = models.IntegerField()
	ruling_start_date = models.DateField()
	gender = models.CharField(max_length=1)
	

	class Meta:
		managed = False
		db_table = 'party_member'	



		