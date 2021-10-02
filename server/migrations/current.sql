DROP TABLE IF EXISTS file;
CREATE TABLE file  (
  id  VARCHAR(5) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(127) NOT NULL,
  custom_name VARCHAR(255),
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS site_statistic;
CREATE TABLE site_statistic  (
  page_loads INTEGER DEFAULT 0 NOT NULL
);
INSERT INTO site_statistic (page_loads) VALUES (0);
