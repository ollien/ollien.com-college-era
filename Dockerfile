FROM nginx
MAINTAINER Nick Krichevsky <nick@ollien.com>

RUN apt-get update && apt-get install -y git curl gnupg && \
	curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
	apt-get update && apt-get install -y nodejs && \
	npm install -g check-dependencies gulp-cli && \
	useradd -m ollien.com && \
	mkdir /home/ollien.com/www
COPY nginx/conf.d /etc/nginx/conf.d/default.conf
COPY start.sh /

CMD /start.sh
