import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FileT } from "../schema";
import { currentFileState } from "../state/currentFileState";
import { uploadedFileState } from "../state/uploadedFileState";
import { useApiService } from "./useApiService";

export function useFile(fileId: string) {
  const [uploadedFile, setUploadedFile] = useRecoilState(uploadedFileState);
  const [currentFile, setCurrentFile] = useRecoilState(currentFileState);
  const {
    data: fetchedFile,
    get: fetch,
    error,
  } = useApiService<FileT>("get-file");

  useEffect(() => {
    // Reset current file from leaving from the view
    return () => {
      setCurrentFile(null);
    };
  }, []);

  useEffect(() => {
    setCurrentFile(fetchedFile);
  }, [fetchedFile]);

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
  }, [uploadedFile?.id]);

  return { error, currentFile };
}
