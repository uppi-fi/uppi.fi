import { currentUserState } from '../state/currentUserState';
import { fileListState } from '../state/fileList/fileListState';
import { sortedFileListState } from '../state/fileList/sortedFileListState';
import { FileT } from '@shared/schema';
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useApiService } from './useApiService';

export function useFetchFiles() {
  const currentUser = useRecoilValue(currentUserState);
  const {
    data: apiFiles,
    get: fetch,
    error,
  } = useApiService<FileT[]>('get-files');
  const setFiles = useSetRecoilState(fileListState);
  const files = useRecoilValue(sortedFileListState);

  useEffect(() => {
    if (apiFiles) setFiles(apiFiles);
  }, [apiFiles, setFiles]);

  useEffect(() => {
    if (currentUser) {
      fetch({
        userId: currentUser.userId,
      });
    }
  }, [fetch, currentUser]);

  return { files, error };
}
