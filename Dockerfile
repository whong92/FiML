# build react main.js
FROM ubuntu:18.04 as run_image_base

ADD requirements.txt /opt/FiML/
WORKDIR /opt/FiML

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev curl \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 install --upgrade pip

RUN apt-get -y update && \
    apt install -y git libpq-dev nginx gettext-base && \
    pip install -r requirements.txt

FROM node:10.17.0 as node_builder

ADD . /opt/FiML/
WORKDIR /opt/FiML

RUN npm install && npm run build

# copy built node app into this container to run with django
FROM run_image_base as run_image

ARG deploy=1
ENV env_deploy=${deploy}

ADD . /opt/FiML/
WORKDIR /opt/FiML

COPY --from=node_builder /opt/FiML/FiML/frontend/static/frontend/main.js /opt/FiML/FiML/frontend/static/frontend/

# containers not run with root privileges on heroku, also good practice in general
RUN useradd -m myuser

RUN /bin/bash -c 'chmod -R a+w /opt'
RUN /bin/bash -c 'chmod a+x /opt/FiML/run.sh'

USER myuser

WORKDIR /opt/FiML

CMD ["/bin/bash", "/opt/FiML/run.sh"]