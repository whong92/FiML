from backend.models import Film, Rating
from rest_framework import viewsets, permissions
from .serializers import FilmSerializer, RatingSerializer, FilmDetailsSerializer

# Lead ViewSets

class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FilmSerializer

class FilmDetailsViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FilmDetailsSerializer

class RatingViewSet(viewsets.ModelViewSet):
    
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RatingSerializer

    def get_queryset(self):
        return self.request.user.ratings.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)