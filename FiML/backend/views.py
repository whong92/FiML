from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
# Create your views here.

# views that redirect to the reclibwh backend

@csrf_exempt
def user_recommend(request):

    if request.method == 'POST':
        req = json.loads(request.body)
        resp = requests.post(settings.RECOMMENDER_ENDPOINT+'user_recommend', json=req)
        resp.raise_for_status()
        return JsonResponse(resp.json())
    else:
        return HttpResponseNotFound('Go to gulag!')


@csrf_exempt
def user_update(request):

    if request.method == 'POST':
        req = json.loads(request.body)
        resp = requests.post(settings.RECOMMENDER_ENDPOINT+'user_update', json=req)
        resp.raise_for_status()
        return JsonResponse(resp.json())
    else:
        return HttpResponseNotFound('Go to gulag!')

