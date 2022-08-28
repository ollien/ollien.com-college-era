FROM nginx:1.23.1
MAINTAINER Nick Krichevsky <nick@ollien.com>

RUN apt-get update && apt-get install -y git curl python gnupg && \
	curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
	apt-get update && apt-get install -y nodejs && \
	useradd -m ollien.com

USER ollien.com
COPY --chown=ollien.com:ollien.com . /home/ollien.com/src
COPY nginx/conf.d /etc/nginx/conf.d/default.conf

WORKDIR /home/ollien.com/src
RUN npm install && \
	npx gulp sass --prod --dest=/home/ollien.com/src/static/ && \
	mkdir /home/ollien.com/www && \
	cp -r /home/ollien.com/src/index.html /home/ollien.com/src/static /home/ollien.com/www/

WORKDIR /home/ollien.com/www
USER root

CMD nginx -g "daemon off;"
