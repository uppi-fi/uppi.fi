import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "wouter";
import VideoFile from "../../components/VideoFile";
import { env } from "../../env";
import { FileT } from "../List";
import styles from "./FileView.module.scss";

interface FileViewProps {
  fileId: string;
}

interface ErrorT {
  error: true;
}

function FileView({ fileId }: FileViewProps) {
  const [file, setFile] = useState<FileT>();
  const [error, setError] = useState<boolean>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>();

  useEffect(() => {
    axios
      .get<FileT | ErrorT>(`${env.serverHost}/get-file`, {
        params: {
          fileId,
        },
      })
      .then(({ data }) => ("error" in data ? setError(true) : setFile(data)));
  }, []);

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
    return <div>Tiedostoa ei löydy</div>;
  }

  if (!file) {
    return <div>Ladataan...</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.file}>
        {file.mime_type.startsWith("video") && <VideoFile file={file} />}
      </div>
      <footer>
        {file.custom_name !== file.filename ? file.custom_name : file.filename}
        <a href={`${env.serverHost}/${file.filename}`} download>
          <Icon icon="fa-solid:download" className={styles.icon} />
        </a>
      </footer>
    </div>
  );
}

export default FileView;
