import { appConfig } from '@shared/config';
import { useLocation } from 'wouter';

export function useIsFileView() {
  const [location] = useLocation();
  const isFileLocation = new RegExp(
    `^\/[a-z0-9-]{${appConfig.fileIdLength}}$`,
    'i'
  ).test(location);
  return isFileLocation;
}
