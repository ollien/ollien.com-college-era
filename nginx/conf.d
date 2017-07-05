server {
	listen 8002;
	server_name homepage;
	root /home/ollien.com/www/;
	charset utf-8;

	location / {}

	location /index.html {}

	location /static {
		autoindex off;
	}
}
