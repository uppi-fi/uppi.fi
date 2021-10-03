import { env } from "@shared/env";
import { URL } from "url";
import { createServer } from "vite";

(async () => {
  const server = await createServer({
    configFile: false,
    root: __dirname,
    server: {
      port: Number(new URL(env.frontendHost || "").port),
    },
  });
  await server.listen();
  console.log(`Vite dev server is running at ${env.frontendHost}`);
})();
