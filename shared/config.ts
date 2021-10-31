import { cleanEnv, num, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  TELEGRAM_BOT_TOKEN: str({ desc: 'Your token for Telegram bot' }),
  BACKEND_PORT: port({ default: 8000 }),
  BACKEND_URL: str({
    default: 'http://localhost:3005/api',
    desc: 'Backend URL for prefixing backend calls',
  }),
  FRONTEND_BASE_URL: str({
    default: 'http://localhost:3005',
    desc: 'The url Telegram bot messages prefix links to',
  }),
  FRONTEND_PORT: port({
    default: 3005,
    desc: 'The port frontend is running at',
  }),
  DATABASE_URL: str({
    default: 'postgres://postgres:postgres@localhost:5433/laturi',
  }),
  SHADOW_DATABASE_URL: str({
    default: 'postgres://postgres:postgres@localhost:5433/laturi_shadow',
  }),

  // NOTE: Remember to update this in nginx.conf too.
  //       Found at nginx.conf: "client_max_body_size"
  MAX_FILE_SIZE: num({ default: 500_000_000 }),

  DISABLED_MIME_TYPES: str({
    desc: 'Disabled file-types splitted by comma (,)',
    default: 'text/html,image/svg+xml',
  }),
  FILE_ID_LENGTH: num({ default: 10, desc: 'File ID length in URLs' }),
});
