FROM nginx:alpine
MAINTAINER Workshops Europe GmbH <info@workshops.de>

COPY nginx.conf /etc/nginx/nginx.conf
COPY _site /usr/share/nginx/html

RUN nginx -t

EXPOSE 80
