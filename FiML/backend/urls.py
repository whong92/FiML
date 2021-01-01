from rest_framework import routers
from .api import FilmViewSet, RatingViewSet, FilmDetailsViewSet, RecommendationsViewSet
from django.urls import path
from .views import update_and_recommend, item_similar_to

router = routers.DefaultRouter()
router.register('api/films', FilmViewSet, 'films')
router.register('api/filmdetails', FilmDetailsViewSet, 'filmdetails')
router.register('api/ratings', RatingViewSet, 'ratings')
router.register('api/recommendations', RecommendationsViewSet, 'recommendations')

urlpatterns = router.urls + [
     path('update_and_recommend', update_and_recommend, name='update_and_recommend'),
     path('item_similar_to', item_similar_to, name='item_similar_to'),
]