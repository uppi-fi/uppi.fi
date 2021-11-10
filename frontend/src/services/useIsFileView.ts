import { env } from '@shared/config';
import { useLocation } from 'wouter';

export function useIsFileView() {
  const [location] = useLocation();
  const isFileLocation = new RegExp(
    `^\/files\/[a-z0-9-]{${env.FILE_ID_LENGTH}}$`,
    'i'
  ).test(location);
  return isFileLocation;
}
