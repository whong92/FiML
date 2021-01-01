from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from .models import SimilarItems, Film
# Create your views here.

# views that redirect to the reclibwh backend

@csrf_exempt
def update_and_recommend(request):

    if request.method == 'POST':
        req = json.loads(request.body)
        resp = requests.post(settings.RECOMMENDER_ENDPOINT+'update_and_recommend', json=req)
        resp.raise_for_status()
        return JsonResponse(resp.json())
    else:
        return HttpResponseNotFound('Go to gulag!')

@csrf_exempt
def item_similar_to(request):

    if request.method == 'POST':
        req = json.loads(request.body)
        similar_items = {}
        for film_id in req['films']:
            film = Film.objects.get(dataset_id=int(film_id))
            obj, created = SimilarItems.objects.get_or_create(film=film, defaults={"similar_items": {"sim_items": [], "sims": []}})
            if created:
                resp = requests.post(settings.RECOMMENDER_ENDPOINT+'item_similar_to', json={'items': [int(film_id)]})
                resp.raise_for_status()
                film_similar_items = resp.json()[str(film_id)]
                SimilarItems.objects.filter(pk=film).update(similar_items=film_similar_items)
                similar_items[film_id] = film_similar_items
            else:
                similar_items[film_id] = obj.similar_items
        return JsonResponse(similar_items)
    else:
        return HttpResponseNotFound('Go to gulag!')

