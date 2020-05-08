from rest_framework import serializers
from backend.models import Film, Rating

class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):

    user=serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = Rating
        fields = '__all__'
