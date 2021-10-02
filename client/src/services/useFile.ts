import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FileT } from "shared";
import { currentFileState } from "../state/currentFileState";
import { uploadedFileState } from "../state/uploadedFileState";
import { getServerUrl } from "../utils/url";

interface ErrorT {
  error: true;
}

export function useFile(fileId: string) {
  const [error, setError] = useState<boolean>();
  const [uploadedFile, setUploadedFile] = useRecoilState(uploadedFileState);
  const [currentFile, setCurrentFile] = useRecoilState(currentFileState);

  useEffect(() => {
    return () => {
      setCurrentFile(null);
    };
  }, []);

  useEffect(() => {
    // File just uploaded, we can use it
    if (uploadedFile) {
      setCurrentFile(uploadedFile);
      setUploadedFile(null);
      return;
    }

    // Fetch file from server
    axios
      .get<FileT | ErrorT>(getServerUrl("get-file"), {
        params: {
          fileId,
        },
      })
      .then(({ data }) =>
        "error" in data ? setError(true) : setCurrentFile(data),
      );
  }, [uploadedFile?.id]);

  return { error, currentFile };
}
