import { env } from "../env";
import { FileT } from "../schema";

export function getServerUrl(path: string, params?: Record<string, string>) {
  return env.serverHost + "/" + path;
}

export function getFileUrl(file: FileT) {
  return getServerUrl(`${file.id}/${file.filename}`);
}
