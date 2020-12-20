#!/bin/bash

# start the app
export DJANGO_SETTINGS_MODULE=FiML.settings
if [ $env_deploy == 1 ]; then
    export DJANGO_SETTINGS_MODULE=FiML.settings_deploy
fi

cd /opt/FiML/FiML
python /opt/FiML/FiML/manage.py collectstatic --noinput
gunicorn -b 0.0.0.0:8000 FiML.wsgi