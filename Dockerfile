FROM postgres:14
COPY scripts/create-databases.sh /docker-entrypoint-initdb.d/