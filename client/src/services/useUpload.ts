import axios from "axios";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { FileT } from "../../../shared/types";
import { appState } from "../state/appState";
import { getServerUrl } from "../utils/url";

export function useUpload() {
  const setAppState = useSetRecoilState(appState);

  const setUploadedFile = (uploadedFile: FileT) =>
    setAppState((old) => ({
      ...old,
      uploadedFile,
    }));
  const setProgress = (uploadProgress: number) =>
    setAppState((old) => ({
      ...old,
      uploadProgress,
    }));

  const upload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post<FileT>(getServerUrl("upload"), formData, {
      onUploadProgress: (p: ProgressEvent) => setProgress(p.loaded / p.total),
    });

    setProgress(1);
    setUploadedFile(data);
    return data;
  }, []);

  return upload;
}
