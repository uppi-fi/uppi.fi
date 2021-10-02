FROM postgres:12
COPY scripts/create-databases.sh /docker-entrypoint-initdb.d/