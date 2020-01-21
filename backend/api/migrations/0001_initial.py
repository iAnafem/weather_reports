# Generated by Django 3.0.2 on 2020-01-21 06:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Temperature',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_report', models.DateTimeField()),
                ('temperature', models.DecimalField(decimal_places=1, max_digits=5)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.City')),
            ],
            options={
                'ordering': ['date_of_report'],
            },
        ),
        migrations.CreateModel(
            name='Pressure',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_report', models.DateTimeField()),
                ('pressure', models.DecimalField(decimal_places=1, max_digits=5)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.City')),
            ],
            options={
                'ordering': ['date_of_report'],
            },
        ),
        migrations.CreateModel(
            name='Humidity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_report', models.DateTimeField()),
                ('humidity', models.IntegerField()),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.City')),
            ],
            options={
                'ordering': ['date_of_report'],
            },
        ),
    ]
