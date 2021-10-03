import { env } from "@shared/env";
import * as path from "path";
import { URL } from "url";
import { createServer } from "vite";

(async () => {
  const port = Number(new URL(env.frontendHost || "").port);
  const server = await createServer({
    configFile: path.join(__dirname, "vite.config.ts"),
    root: __dirname,
    server: {
      port,
      host: true,
    },
  });
  await server.listen();
  console.log(`Vite dev server is running at ${env.frontendHost}`);
})();
