import { uploadFile } from '@frontend/api';
import { env } from '@shared/config';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLocation } from 'wouter';
import { uploadedFileState } from '../state/uploadedFileState';
import { uploadProgresState } from '../state/uploadProgresState';
import { useCurrentUser } from './useCurrentUser';

export function useUpload() {
  const [, setLocation] = useLocation();
  const { currentUser } = useCurrentUser();
  const setUploadedFile = useSetRecoilState(uploadedFileState);
  const setUploadProgress = useSetRecoilState(uploadProgresState);

  const upload = useCallback(
    async (file: File) => {
      if (!currentUser) {
        return alert('Et oo kirjautuneena?');
      }

      if (file.size > env.MAX_FILE_SIZE) {
        return alert('Max koko 10MB');
      }

      if (env.DISABLED_MIME_TYPES.split(',').includes(file.type)) {
        return alert('Tiedostotyyppi ei sallittu');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', currentUser?.userId);

      const uploadedFile = await uploadFile(formData, (p: ProgressEvent) =>
        setUploadProgress(p.loaded / p.total)
      );

      setUploadProgress(1);
      setUploadedFile(uploadedFile);
      setLocation(`/files/${uploadedFile.id}`);
      return uploadedFile;
    },
    [currentUser, setLocation, setUploadProgress, setUploadedFile]
  );

  return upload;
}
