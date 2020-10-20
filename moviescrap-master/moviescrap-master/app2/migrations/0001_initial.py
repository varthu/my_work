# Generated by Django 3.0.6 on 2020-05-28 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='movie_details',
            fields=[
                ('movie_id', models.AutoField(primary_key=True, serialize=False)),
                ('movie_name', models.CharField(max_length=70)),
            ],
            options={
                'db_table': 'movie_details',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='soundtrack',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('soundtrack_id', models.IntegerField()),
                ('title', models.CharField(max_length=80)),
                ('singer', models.CharField(max_length=80)),
                ('length', models.IntegerField()),
            ],
            options={
                'db_table': 'soundtrack',
                'managed': False,
            },
        ),
    ]
