# Generated by Django 3.0.5 on 2020-05-02 23:45

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0005_auto_20200502_2327'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='rating',
            unique_together={('film', 'user')},
        ),
    ]
