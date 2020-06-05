#!/bin/bash

python -m reclibwh.apps.serve_recommender --data_dir /opt/FiML/FiML/ --model_path /opt/FiML/2020_06_04_MF_latest_trained_reduced/ --port 8080 > /opt/bla.log 2>&1 &
python /opt/FiML/FiML/manage.py runserver 0.0.0.0:$PORT > /opt/bla.log 2>&1 &
tail -f  /opt/bla.log