from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Film(models.Model):
    name = models.CharField(max_length=512)
    dataset_id = models.IntegerField(unique=True, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    poster = models.CharField(max_length=512, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)
    mean_rating = models.FloatField(null=False, default=0.)

# TODO: https://stackoverflow.com/questions/2201598/how-to-define-two-fields-unique-as-couple when add users
class Rating(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    rating = models.FloatField()
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, related_name="ratings", on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('film', 'user',)