import { FileT } from "../schema";

export function isVideoFile(file: FileT) {
  return file.mimeType.startsWith("video");
}
export function isImageFile(file: FileT) {
  return file.mimeType.startsWith("image");
}
export function isAudioFile(file: FileT) {
  return file.mimeType.startsWith("audio");
}
