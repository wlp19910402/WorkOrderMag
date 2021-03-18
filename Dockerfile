FROM nginx
MAINTAINER li.wang@jsxfedu.com
COPY dist/ /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/default.conf