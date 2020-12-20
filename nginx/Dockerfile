ARG BUILD_ENV=deploy

FROM nginx:alpine as build_deploy
ONBUILD COPY ./default.conf /etc/nginx/nginx.conf

FROM nginx:alpine as build_local
ONBUILD COPY ./local.conf /etc/nginx/nginx.conf

FROM build_${BUILD_ENV}
RUN cat /etc/nginx/nginx.conf

#FROM nginx:alpine
#
#COPY nginx.conf /etc/nginx/nginx.conf
#
#RUN apk update && apk add bash
