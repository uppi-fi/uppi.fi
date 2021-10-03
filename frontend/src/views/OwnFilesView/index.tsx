import { Icon } from "@iconify/react";
import { FileT } from "@shared/schema";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Centered from "../../components/Centered";
import FileCard from "../../components/FileCard";
import Row from "../../components/Row";
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
      <Centered>
        <Spinner />
      </Centered>
    );
  }
  if (!files.length) {
    return (
      <Centered className={styles.row}>
        <Row alignItems="center" gap="8px">
          <Icon icon="entypo:emoji-sad" fontSize={25} /> Et ole vielä lisännyt
          tiedostoja
        </Row>
      </Centered>
    );
  }

  return (
    <>
      <div className={styles.root}>
        {files.map((file, i) => (
          <FileCard key={i} file={file} />
        ))}
      </div>
      {/* Adds some spacing so we can scroll further */}
      <div className={styles.spacer} />
    </>
  );
}

export default OwnFiles;
