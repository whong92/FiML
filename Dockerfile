FROM tensorflow/tensorflow:latest-py3

ADD ./requirements.txt ./

RUN apt-get -y update && \
    apt install -y git libpq-dev nginx gettext-base && \
    pip install -r requirements.txt

ADD . /opt/FiML/
WORKDIR /opt/FiML

WORKDIR /app

# containers not run with root privileges on heroku, also good practice in general
RUN useradd -m myuser

## add permissions for nginx, adapted from https://www.rockyourcode.com/run-docker-nginx-as-non-root-user/
RUN chown -R myuser:myuser /app && chmod -R 755 /app && \
        chown -R myuser:myuser /var && \
        chown -R myuser:myuser /etc
RUN touch /var/run/nginx.pid && chown -R myuser:myuser /var/run/nginx.pid

RUN /bin/bash -c 'chmod -R a+w /opt'
RUN /bin/bash -c 'chmod a+x /opt/FiML/run.sh'

USER myuser

ENV DJANGO_SETTINGS_MODULE=FiML.settings_gcp
WORKDIR /opt/FiML

CMD ["/bin/sh", "/opt/FiML/run.sh"]