# Generated by Django 3.0.8 on 2020-07-14 10:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onboarding', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audit',
            name='updated_dt',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 14, 15, 46, 40, 954848), null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='created_dt',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 7, 14, 15, 46, 40, 954848), null=True),
        ),
    ]