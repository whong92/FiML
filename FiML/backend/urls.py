from rest_framework import routers
from .api import FilmViewSet, RatingViewSet, FilmDetailsViewSet
from django.urls import path
from .views import user_recommend, user_update

router = routers.DefaultRouter()
router.register('api/films', FilmViewSet, 'films')
router.register('api/filmdetails', FilmDetailsViewSet, 'filmdetails')
router.register('api/ratings', RatingViewSet, 'ratings')

urlpatterns = router.urls + [
    path('user_recommend', user_recommend, name='user_recommend'),
    path('user_update', user_update, name='user_update')
]