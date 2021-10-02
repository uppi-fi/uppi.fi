import { Icon } from "@iconify/react";
import cx from "classnames";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import FileCard from "../../components/FileCard";
import Spinner from "../../components/Spinner";
import { FileT } from "../../schema";
import { useApiService } from "../../services/useApiService";
import { currentUserState } from "../../state/currentUserState";
import styles from "./ListingView.module.scss";

function ListingView() {
  const currentUser = useRecoilValue(currentUserState);
  const { data: files, get: fetch } = useApiService<FileT[]>("get-files");

  useEffect(() => {
    fetch({
      userId: currentUser?.userId,
    });
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
    <div className={styles.root}>
      {files.map((file, i) => (
        <FileCard key={i} file={file} />
      ))}
    </div>
  );
}

export default ListingView;
