import { FileT } from "@shared/schema";

export function isVideoFile(file: FileT) {
  const isFlvFile =
    file.mimeType === "application/octet-stream" &&
    file.fileExtension === ".flv";
  return file.mimeType.startsWith("video") || isFlvFile;
}

export function isImageFile(file: FileT) {
  return file.mimeType.startsWith("image");
}

export function isAudioFile(file: FileT) {
  return file.mimeType.startsWith("audio");
}
