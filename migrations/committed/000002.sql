--! Previous: sha1:ccce0039054a7b90a8ebcbcb57f659fa0e6c9600
--! Hash: sha1:6e9936ca05c9dae5c9dd3ba26a340528011018f9

-- Enter migration here
ALTER TABLE users
ADD COLUMN IF NOT EXISTS username varchar(255) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS password varchar(255) NOT NULL DEFAULT '';
