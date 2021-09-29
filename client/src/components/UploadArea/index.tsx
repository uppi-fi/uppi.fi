import { Icon } from "@iconify/react";
import cx from "classnames";
import { memo, useRef } from "react";
import { useDropArea } from "react-use";
import styles from "./UploadArea.module.scss";

export interface UploadAreaProps {
  progress: number;
  onShouldUpload: (file: File) => void;
}

function UploadArea({ progress, onShouldUpload }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: File[] | FileList | null) => {
    if (files?.length === 1) {
      const [file] = files;
      onShouldUpload(file);
    }
  };

  const [bond, state] = useDropArea({
    onFiles,
  });

  return (
    <div
      {...bond}
      className={cx(styles.root, {
        [styles.active]: state.over,
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
          height: `${progress * 100}%`,
        }}
      />
      <Icon icon="feather:upload" color="#2a9d8f" fontSize="15vw" />
    </div>
  );
}

export default memo(UploadArea);
