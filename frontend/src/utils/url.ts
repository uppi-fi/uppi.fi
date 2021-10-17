import { env } from '@shared/config';
import { FileT } from '@shared/schema';

const safeFilename = encodeURIComponent;

function getSafeFileUrl(file: FileT) {
  return env.BACKEND_URL + `/${file.id}/${safeFilename(file.filename)}`;
}

export function getVideoPreviewUrl(file: FileT) {
  return env.BACKEND_URL + `/${file.id}/thumbnail.png`;
}

export function getFileDownloadUrl(file: FileT) {
  return env.BACKEND_URL + `/dl?fileId=${file.id}`;
}

export { getSafeFileUrl as getFileUrl };
