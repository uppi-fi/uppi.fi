import axios from "axios";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useLocation } from "wouter";
import { FileT } from "../schema";
import { uploadedFileState } from "../state/uploadedFileState";
import { uploadProgresState } from "../state/uploadProgresState";
import { getServerUrl } from "../utils/url";

export function useUpload() {
  const [, setLocation] = useLocation();
  const setUploadedFile = useSetRecoilState(uploadedFileState);
  const setUploadProgress = useSetRecoilState(uploadProgresState);

  const upload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post<FileT>(getServerUrl("upload"), formData, {
      onUploadProgress: (p: ProgressEvent) =>
        setUploadProgress(p.loaded / p.total),
    });

    setUploadProgress(1);
    setUploadedFile(data);
    setLocation(`/${data.id}`);
    return data;
  }, []);

  return upload;
}
