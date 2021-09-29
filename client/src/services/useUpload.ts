import axios from "axios";
import { useCallback, useState } from "react";
import { env } from "../env";

export interface UploadedFileT {
  filename: string;
  fileId: number;
}

export function useUpload() {
  const [uploaded, setUploaded] = useState<UploadedFileT>();
  const [progress, setProgress] = useState<number>(0);

  const upload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post<UploadedFileT>(
      `${env.serverHost}/upload`,
      formData,
      {
        onUploadProgress: (p: ProgressEvent) => setProgress(p.loaded / p.total),
      },
    );

    setProgress(1);
    setUploaded(data);
    return data;
  }, []);

  return {
    uploaded,
    upload,
    progress,
  };
}
