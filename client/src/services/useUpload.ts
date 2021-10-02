import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useLocation } from "wouter";
import { FileT } from "../schema";
import { uploadedFileState } from "../state/uploadedFileState";
import { uploadProgresState } from "../state/uploadProgresState";
import { useApiService } from "./useApiService";

const MAX_FILE_SIZE = 10_000_000;

export function useUpload() {
  const [, setLocation] = useLocation();
  const setUploadedFile = useSetRecoilState(uploadedFileState);
  const setUploadProgress = useSetRecoilState(uploadProgresState);
  const { post: fetch } = useApiService<FileT>("upload");

  const upload = useCallback(async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return alert("Max koko 10MB");
    }

    const formData = new FormData();
    formData.append("file", file);

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
