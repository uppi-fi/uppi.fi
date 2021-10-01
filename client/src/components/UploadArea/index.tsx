import { Icon } from "@iconify/react";
import cx from "classnames";
import { memo, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useUpload } from "../../services/useUpload";
import { appState } from "../../state/appState";
import styles from "./UploadArea.module.scss";

function UploadArea() {
  const upload = useUpload();
  const { draggingFile, uploadProgress } = useRecoilValue(appState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: File[] | FileList | null) => {
    if (files?.length === 1) {
      upload(files[0]);
    }
  };

  return (
    <div
      className={cx(styles.root, {
        [styles.active]: draggingFile,
      })}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(evt) => onFiles(evt.currentTarget.files)}
      />
      <div
        className={styles.fill}
        style={{
          height: `${uploadProgress * 100}%`,
        }}
      />
      {uploadProgress === 0 ? (
        <Icon icon="feather:upload" color="#2a9d8f" fontSize="15vw" />
      ) : (
        `${Math.round(uploadProgress * 100)}%`
      )}
    </div>
  );
}

export default memo(UploadArea);
