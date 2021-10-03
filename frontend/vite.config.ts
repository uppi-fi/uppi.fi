import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

const frontendPath = path.join(process.cwd(), "frontend");

// https://vitejs.dev/config/
export default defineConfig({
  root: frontendPath,
  server: {
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: [frontendPath],
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@shared",
        replacement: path.resolve(__dirname, "../shared"),
      },
    ],
  },
});
