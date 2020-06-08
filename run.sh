#!/bin/bash

/opt/FiML/gcp/cloud_sql_proxy -instances=fiml-1:europe-west2:fiml=tcp:5432 -credential_file=./gcp/fiml-1-8fb931cba067.json > /opt/bla.log 2>&1 & 

python -m reclibwh.apps.serve_recommender --postgres_config /opt/FiML/gcp/gcp.postgres.config --model_ex /opt/FiML/2020_06_04_MF_latest_trained_reduced/  --model_im /opt/FiML/2020_06_04_ALS_latest_trained_reduced/ --port 8080 > /opt/bla.log 2>&1 &

python /opt/FiML/FiML/manage.py runserver 0.0.0.0:$PORT > /opt/bla.log 2>&1 &

tail -f  /opt/bla.log