import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';
import { env } from '../shared/config';

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/api': env.BACKEND_URL,
    },
    port: env.FRONTEND_PORT,
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
  optimizeDeps: {
    include: ['envalid'],
  },
});
