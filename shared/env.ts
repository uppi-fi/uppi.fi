/**
 * Note: This can't be used in frontend directly, Vite uses
 * `import.meta.env` instead of `process.env`
 **/
export const env = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  frontendHost: process.env.FRONTEND_HOST,
  backendHost: process.env.VITE_BACKEND_HOST,
  databaseUrl: process.env.DATABASE_URL,
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  rootDatabaseUrl: process.env.ROOT_DATABASE_URL,
};
