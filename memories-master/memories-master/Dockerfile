FROM nginx
COPY ./dist/ /usr/share/nginx/html/
COPY ./deploy/vhost.nginx.conf /etc/nginx/conf.d/fxr.conf
COPY ./deploy/ssl/ /etc/nginx/ssl/
EXPOSE 443
