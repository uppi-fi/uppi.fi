import { fetchFile, useApi } from '@frontend/api';

export function useFile(fileId: string) {
  const { data: currentFile, error } = useApi(fetchFile({ fileId }));
  return { error, currentFile };
}
