import { FileT } from "@shared/schema";
import { env } from "../env";

export function getServerUrl(path: string) {
  return new URL(path, env.apiHost).href;
}

export function getFileUrl(file: FileT) {
  return getServerUrl(`${file.id}/${file.filename}`);
}

export function getVideoPreviewUrl(file: FileT) {
  return getServerUrl(`${file.id}/thumbnail.png`);
}
