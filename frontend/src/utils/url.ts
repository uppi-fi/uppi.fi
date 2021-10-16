import { FileT } from '@shared/schema';

export function getFileUrl(file: FileT) {
  return `/api/${file.id}/${file.filename}`;
}

export function getVideoPreviewUrl(file: FileT) {
  return `/api/${file.id}/thumbnail.png`;
}

export function getFileDownloadUrl(file: FileT) {
  return `/api/dl?fileId=${file.id}`;
}
