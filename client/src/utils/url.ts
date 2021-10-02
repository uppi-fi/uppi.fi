import { env } from "../env";
import { FileT } from "../schema";

export function getServerUrl(path: string) {
  return new URL(path, env.serverHost).href;
}

export function getFileUrl(file: FileT) {
  return getServerUrl(`${file.id}/${file.filename}`);
}

export function getVideoPreviewUrl(file: FileT) {
  return getServerUrl(`${file.id}/thumbnail.png`);
}
