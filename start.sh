#!/usr/bin/env bash
clone_status=$(git clone https://github.com/ollien/ollien.com /home/ollien.com/ollien.com)$?
if [ $clone_status -ne 0 ]; then
	echo "Repo found locally. Running git pull..."
	git -C /home/ollien.com/ollien.com pull -X theirs
fi
cd /home/ollien.com/ollien.com
npm_status=$(check-dependencies)$?
if [ $npm_status -ne 0 ]; then
	echo "Running npm install..."
	npm install
fi
gulp sass --prod --dest=static/
cp -r /home/ollien.com/ollien.com/{index.html,static/} /home/ollien.com/www/
echo "Copied necessary files to /home/ollien.com."
echo "Starting nginx..."
exec nginx -g "daemon off;"
