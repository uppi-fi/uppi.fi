--! Previous: sha1:6e9936ca05c9dae5c9dd3ba26a340528011018f9
--! Hash: sha1:a87ea27469cb98a4739b4a3e8a1f1b48edd60ef7

-- Enter migration here
CREATE TABLE IF NOT EXISTS access_keys (
  access_key VARCHAR(36) PRIMARY KEY UNIQUE,
  use_count INTEGER DEFAULT 0 NOT NULL
);
