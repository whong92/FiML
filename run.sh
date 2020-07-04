#!/bin/bash

# configure nginx with to listen to port $PORT
envsubst < /opt/FiML/nginx/sites-enabled/docker_nginx.conf > /opt/FiML/nginx/sites-enabled/docker_nginx.conf
nginx -c /opt/FiML/nginx/my_nginx.conf

# start gcp
if [ $env_rungcpcp == 1 ]; then
    /opt/FiML/gcp/cloud_sql_proxy -instances=fiml-1:europe-west2:fiml=tcp:5432 -credential_file=/opt/FiML/gcp/fiml-1-8fb931cba067.json > /opt/bla.log 2>&1 & 
fi

# start the app
cd /opt/FiML/FiML
python /opt/FiML/FiML/manage.py collectstatic
uwsgi --socket FiML.sock --module FiML.wsgi --chmod-socket=666  > /opt/bla.log 2>&1 &

tail -f  /opt/bla.log   