import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useLocation } from "wouter";
import { FileT } from "../schema";
import { currentUserState } from "../state/currentUserState";
import { uploadedFileState } from "../state/uploadedFileState";
import { uploadProgresState } from "../state/uploadProgresState";
import { useApiService } from "./useApiService";

const MAX_FILE_SIZE = 10_000_000;

export function useUpload() {
  const [, setLocation] = useLocation();
  const currentUser = useRecoilValue(currentUserState);
  const setUploadedFile = useSetRecoilState(uploadedFileState);
  const setUploadProgress = useSetRecoilState(uploadProgresState);
  const { post: fetch } = useApiService<FileT>("upload");

  const upload = useCallback(async (file: File) => {
    if (!currentUser) {
      return alert("Et oo kirjautuneena?");
    }

    if (file.size > MAX_FILE_SIZE) {
      return alert("Max koko 10MB");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", currentUser?.userId);

    const uploadedFile = await fetch(formData, {
      onUploadProgress: (p: ProgressEvent) =>
        setUploadProgress(p.loaded / p.total),
    });

    setUploadProgress(1);
    setUploadedFile(uploadedFile);
    setLocation(`/${uploadedFile.id}`);
    return uploadedFile;
  }, []);

  return upload;
}
