# Generated by Django 3.0.5 on 2020-04-26 16:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.Film')),
            ],
        ),
    ]
