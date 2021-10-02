import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FileT } from "shared/types";
import { Redirect } from "wouter";
import CopyButton from "../../components/CopyButton";
import DownloadButton from "../../components/DownloadButton";
import ImageFile from "../../components/ImageFile";
import VideoFile from "../../components/VideoFile";
import { appState } from "../../state/appState";
import { isImageFile, isVideoFile } from "../../utils/mimetype";
import { getServerUrl as getServerUrl } from "../../utils/url";
import NotFoundView from "../NotFoundView";
import styles from "./FileView.module.scss";

interface FileViewProps {
  fileId: string;
}

interface ErrorT {
  error: true;
}

function FileView({ fileId }: FileViewProps) {
  const [{ uploadedFile }, setAppState] = useRecoilState(appState);
  const [file, setFile] = useState<FileT | null>(null);
  const [error, setError] = useState<boolean>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>();

  useEffect(() => {
    setAppState((old) => ({
      ...old,
      currentFile: file,
    }));
    return () => {
      setAppState((old) => ({
        ...old,
        currentFile: null,
      }));
    };
  }, [file]);

  useEffect(() => {
    if (uploadedFile) {
      setFile(uploadedFile);
      setAppState((old) => ({
        ...old,
        uploadedFile: null,
      }));
      return;
    }

    axios
      .get<FileT | ErrorT>(getServerUrl("get-file"), {
        params: {
          fileId,
        },
      })
      .then(({ data }) => ("error" in data ? setError(true) : setFile(data)));
  }, [uploadedFile?.id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
    }
  }, [error]);

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <NotFoundView />;
  }

  if (!file) {
    return null;
  }

  const renderFile = () => {
    if (isVideoFile(file)) {
      return <VideoFile file={file} />;
    }
    if (isImageFile(file)) {
      return <ImageFile file={file} />;
    }
  };
  const fileUrl = getServerUrl(file.filename);

  return (
    <div className={styles.root}>
      <div className={styles.file}>{renderFile()}</div>
      <footer>
        <div>
          {file.customName !== file.filename ? file.customName : file.filename}
        </div>
        <div className={styles.buttons}>
          <CopyButton textToCopy={fileUrl} />
          <DownloadButton />
        </div>
      </footer>
    </div>
  );
}

export default FileView;
