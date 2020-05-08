from rest_framework import routers
from .api import FilmViewSet, RatingViewSet

router = routers.DefaultRouter()
router.register('api/films', FilmViewSet, 'films')
router.register('api/ratings', RatingViewSet, 'ratings')

urlpatterns = router.urls