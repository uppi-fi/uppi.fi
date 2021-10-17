import * as dotenv from 'dotenv';
dotenv.config();

import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { env } from '../shared/config';

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  envDir: '../',
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/api': {
        target: `http://localhost:${env.BACKEND_PORT}`,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: env.FRONTEND_PORT,
  },
  define: {
    'process.env': {
      MAX_FILE_SIZE: env.MAX_FILE_SIZE,
      FILE_ID_LENGTH: env.FILE_ID_LENGTH,
      BACKEND_URL: env.BACKEND_URL,
      TELEGRAM_BOT_TOKEN: '""',
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@shared',
        replacement: path.resolve(__dirname, '../shared'),
      },
      {
        find: '@frontend',
        replacement: __dirname,
      },
    ],
  },
});
