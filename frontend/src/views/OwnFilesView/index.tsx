import { Icon } from "@iconify/react";
import { FileT } from "@shared/schema";
import cx from "classnames";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import FileCard from "../../components/FileCard";
import Spinner from "../../components/Spinner";
import { useApiService } from "../../services/useApiService";
import { currentUserState } from "../../state/currentUserState";
import styles from "./OwnFiles.module.scss";

function OwnFiles() {
  const currentUser = useRecoilValue(currentUserState);
  const { data: files, get: fetch } = useApiService<FileT[]>("get-files");

  useEffect(() => {
    if (currentUser) {
      fetch({
        userId: currentUser.userId,
      });
    }
  }, []);

  if (!files) {
    return (
      <div className={styles.centered}>
        <Spinner />
      </div>
    );
  }
  if (!files.length) {
    return (
      <div className={cx(styles.centered, styles.noFiles)}>
        <div>
          <div className={styles.row}>
            <Icon icon="entypo:emoji-sad" fontSize={25} /> Et ole vielä lisännyt
            tiedostoja
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.root}>
        {files.map((file, i) => (
          <FileCard key={i} file={file} />
        ))}
      </div>
      {/* Adds some spacing so we can scroll further */}
      <div className={styles.spacer} />
    </div>
  );
}

export default OwnFiles;
