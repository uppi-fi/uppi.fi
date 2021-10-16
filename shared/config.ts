import * as dotenv from 'dotenv';
import { cleanEnv, num, port, str, url } from 'envalid';

dotenv.config();

/**
 * Note: This can't be used in frontend directly, Vite uses
 * `import.meta.env` instead of `process.env`
 **/
export const env = cleanEnv(process.env, {
  TELEGRAM_BOT_TOKEN: str({ desc: 'Your token for Telegram bot' }),
  BACKEND_URL: url({
    default: 'http://localhost:8000',
    desc: 'Backend url for proxying frontend requests',
  }),
  BACKEND_PORT: port({ default: 8000 }),
  FRONTEND_BASE_URL: url({
    default: 'http://localhost:3005',
    desc: 'The url Telegram bot messages prefix links to',
  }),
  FRONTEND_PORT: port({
    default: 3005,
    desc: 'The port frontend is running at',
  }),
  DATABASE_URL: url({
    default: 'postgres://postgres:postgres@localhost:5433/laturi',
  }),
  SHADOW_DATABASE_URL: url({
    default: 'postgres://postgres:postgres@localhost:5433/laturi_shadow',
  }),
  MAX_FILE_SIZE: num({ default: 250_000_000 }),
  FILE_ID_LENGTH: num({ default: 10, desc: 'File ID length in URLs' }),
});
