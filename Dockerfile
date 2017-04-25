FROM nginx:alpine
MAINTAINER Workshops Europe GmbH <info@workshops.de>

COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

COPY _site /usr/share/nginx/html

EXPOSE 80
