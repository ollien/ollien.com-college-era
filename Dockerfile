FROM nginx
MAINTAINER Nick Krichevsky <nick@ollien.com>

RUN apt-get update
RUN apt-get install -y git curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs #We don't have to call apt-get update a second time. It's already called by the above script.
RUN npm install -g check-dependencies gulp-cli
COPY nginx/conf.d /etc/nginx/conf.d/default.conf
RUN useradd -m ollien.com
RUN mkdir /home/ollien.com/www
COPY start.sh /

CMD /start.sh
