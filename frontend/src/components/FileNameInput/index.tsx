import { FileT } from "@shared/schema";
import cx from "classnames";
import { useState } from "react";
import { useApiService } from "../../services/useApiService";
import styles from "./FileNameInput.module.scss";

type UpdateFileParams = Pick<FileT, "id"> &
  Partial<Pick<FileT, "customName" | "filename" | "viewCount">>;

interface FileNameInputProps {
  file: FileT;
  className?: string;
}

function FileNameInput({ file, className }: FileNameInputProps) {
  const [filenameValue, setFilenameValue] = useState(file.customName);
  const { post: updateFile } = useApiService<{}, UpdateFileParams>(
    "update-file",
  );

  return (
    <input
      className={cx(styles.input, className)}
      type="text"
      value={filenameValue}
      onChange={(evt) => {
        const { value } = evt.currentTarget;
        setFilenameValue(value);
        // TODO: Update custom_name
      }}
      spellCheck={false}
      placeholder="Lisää otsikko"
      onBlur={() => {
        updateFile({
          id: file.id,
          customName: filenameValue,
        });
      }}
    />
  );
}

export default FileNameInput;
