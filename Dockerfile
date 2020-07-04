# build react main.js
FROM node:10.17.0

ADD . /opt/FiML/
WORKDIR /opt/FiML

RUN npm install && npm run build

# copy built node app into this container to run with django
FROM ubuntu:18.04

ARG rungcpcp=1
ENV env_rungcpcp=${rungcpcp}

ADD . /opt/FiML/
WORKDIR /opt/FiML

COPY --from=0 /opt/FiML/FiML/frontend/static/frontend/main.js /opt/FiML/FiML/frontend/static/frontend/

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN apt-get -y update && \
    apt install -y git libpq-dev nginx gettext-base && \
    pip install -r requirements.txt

# containers not run with root privileges on heroku, also good practice in general
RUN useradd -m myuser

RUN /bin/bash -c 'chmod -R a+w /opt'
RUN /bin/bash -c 'chmod a+x /opt/FiML/run.sh'

USER myuser

ENV DJANGO_SETTINGS_MODULE=FiML.settings_gcp
WORKDIR /opt/FiML

CMD ["/bin/bash", "/opt/FiML/run.sh"]