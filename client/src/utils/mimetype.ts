import { FileT } from "shared";

export function isVideoFile(file: FileT) {
  return file.mimeType.startsWith("video");
}
export function isImageFile(file: FileT) {
  return file.mimeType.startsWith("image");
}