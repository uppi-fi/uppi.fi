--! Previous: -
--! Hash: sha1:587310a9c9f396b6f25472b834b746b169c860a7

DROP TABLE IF EXISTS files;
CREATE TABLE files  (
  id  VARCHAR(5) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(127) NOT NULL,
  custom_name VARCHAR(255)
);
