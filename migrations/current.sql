-- Enter migration here
ALTER TABLE users
ADD COLUMN username varchar(255) NOT NULL DEFAULT '',
ADD COLUMN password varchar(255) NOT NULL DEFAULT '';