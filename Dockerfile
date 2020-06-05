FROM tensorflow/tensorflow:latest-py3

ADD . /opt/FiML/
WORKDIR /opt/FiML

RUN apt-get -y update && \
    apt install -y git && \
    pip install -r requirements.txt

RUN useradd -m myuser

RUN /bin/bash -c 'chmod -R a+w /opt'
RUN /bin/bash -c 'chmod a+x /opt/FiML/run.sh'

USER myuser

WORKDIR /opt/FiML

CMD ["/bin/sh", "/opt/FiML/run.sh"]

# CMD python -m reclibwh.apps.serve_recommender \
#     --data_dir /opt/FiML/FiML/ \
#     --model_path /opt/FiML/2020_06_04_MF_latest_trained_reduced/ \
#     --port 8080 \
#     > /opt/bla.log 2>&1 & && \
#     python /opt/FiML/FiML/manage.py runserver 0.0.0.0:$PORT > /opt/bla.log 2>&1 & && \
#     tail -f  /opt/bla.log

# python -m reclibwh.apps.serve_recommender --data_dir /opt/FiML/FiML/ --model_path /opt/FiML/2020_06_04_MF_latest_trained_reduced/ --port 8080 > /opt/bla.log 2>&1 & && python manage.py runserver 0.0.0.0:$PORT > /opt/bla.log 2>&1 & && tail -f  /opt/bla.log
# python -m reclibwh.apps.serve_recommender --data_dir /root/ong/FiML/FiML/ --model_path /root/ong/FiML/2020_06_04_MF_latest_trained_reduced/ --port 8080 > /root/ong/bla.log 2>&1 & && python manage.py runserver 0.0.0.0:8000 > /root/ong/bla.log 2>&1 & && tail -f  /root/ong/bla.log