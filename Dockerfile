FROM postgres:14
COPY scripts/create-databases.sh /docker-entrypoint-initdb.d/
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d