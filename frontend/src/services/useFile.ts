import { FileT } from '@shared/schema';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentFileState } from '../state/currentFileState';
import { uploadedFileState } from '../state/uploadedFileState';
import { useApiService } from './useApiService';

export function useFile(fileId: string) {
  const [uploadedFile, setUploadedFile] = useRecoilState(uploadedFileState);
  const [currentFile, setCurrentFile] = useRecoilState(currentFileState);
  const {
    data: fetchedFile,
    get: fetch,
    error,
  } = useApiService<FileT>('get-file');

  useEffect(() => {
    // Reset current file from leaving from the view
    return () => {
      setCurrentFile(null);
    };
  }, [setCurrentFile]);

  useEffect(() => {
    setCurrentFile(fetchedFile);
  }, [fetchedFile, setCurrentFile]);

  useEffect(() => {
    // File just uploaded, we can use it
    if (uploadedFile) {
      setCurrentFile(uploadedFile);
      setUploadedFile(null);
      return;
    }

    // Fetch file from server
    fetch({
      fileId,
    });
  }, [fetch, fileId, setCurrentFile, setUploadedFile, uploadedFile]);

  return { error, currentFile };
}
