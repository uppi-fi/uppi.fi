import { Icon } from "@iconify/react";
import { useRecoilValue } from "recoil";
import { FileT } from "../../schema";
import { currentUserState } from "../../state/currentUserState";
import { formatDate } from "../../utils/time";
import { getFileUrl } from "../../utils/url";
import CopyButton from "../CopyButton";
import DeleteButton from "../DeleteButton";
import DownloadButton from "../DownloadButton";
import styles from "./FileFooter.module.scss";

interface FileFooterProps {
  file: FileT;
}

function FileFooter({ file }: FileFooterProps) {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <footer className={styles.root}>
      <div className={styles.row}>
        <div className={styles.col}>
          {file.customName !== file.filename ? file.customName : file.filename}
          <div className={styles.date}>
            {formatDate(file.createdAt)}
            <Icon icon="bx:bx-calendar" fontSize={18} />{" "}
          </div>
        </div>

        <div className={styles.buttons}>
          {currentUser?.userId === file.userId && (
            <DeleteButton fileId={file.id} />
          )}
          <CopyButton textToCopy={getFileUrl(file)} />
          <DownloadButton fileId={file.id} />
        </div>
      </div>
    </footer>
  );
}

export default FileFooter;
