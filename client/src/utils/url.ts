import { env } from "../env";

export function getServerUrl(path: string) {
  return env.serverHost + "/" + path;
}
