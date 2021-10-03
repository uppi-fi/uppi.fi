import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: [path.resolve(__dirname, '..')],
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
        find: '@backend',
        replacement: path.resolve(__dirname, '../backend'),
      },
      {
        find: '@frontend',
        replacement: __dirname,
      },
    ],
  },
});
