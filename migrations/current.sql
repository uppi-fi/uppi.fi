-- Users
CREATE TABLE IF NOT EXISTS users  (
  user_id VARCHAR(36) PRIMARY KEY UNIQUE,
  telegram_user_id BIGINT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Files
DROP TABLE IF EXISTS files;
CREATE TABLE files  (
  id  VARCHAR(10) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(127) NOT NULL,
  custom_name VARCHAR(255),
  file_extension VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id VARCHAR(36) NOT NULL REFERENCES users (user_id)
);

-- Site statistics
DROP TABLE IF EXISTS site_statistics;
CREATE TABLE site_statistics  (
  page_loads INTEGER DEFAULT 0 NOT NULL
);
INSERT INTO site_statistics (page_loads) VALUES (0);
