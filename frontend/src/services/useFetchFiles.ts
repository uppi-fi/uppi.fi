import { fetchFiles, useApi } from '@frontend/api';

export function useFetchFiles() {
  const { data: files, error } = useApi(fetchFiles);
  return { files, error };
}
