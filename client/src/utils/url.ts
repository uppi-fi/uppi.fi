import { FileT } from "../../../shared/types";
import { env } from "../env";

export function getServerUrl(path: string, params?: Record<string, string>) {
  return env.serverHost + "/" + path;
}

export function getFileUrl(file: FileT) {
  return getServerUrl(`${file.id}/${file.filename}`);
}
