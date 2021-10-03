import { FileT } from "@shared/schema";
import { useState } from "react";
import { useApiService } from "../../services/useApiService";
import FileCardMedia from "../FileCardMedia";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  file: FileT;
}

type UpdateFileParams = Pick<FileT, "id"> &
  Partial<Pick<FileT, "customName" | "filename" | "viewCount">>;

function FileCard({ file }: FileCardProps) {
  const [filenameValue, setFilenameValue] = useState(file.filename);
  const { post: updateFile } = useApiService<{}, UpdateFileParams>(
    "update-file",
  );

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <FileCardMedia file={file} />
        <div className={styles.fileDetails}>
          <input
            type="text"
            value={filenameValue}
            onChange={(evt) => {
              const { value } = evt.currentTarget;
              setFilenameValue(value);
              updateFile({
                id: file.id,
                customName: value,
              });
              // TODO: Update custom_name
            }}
            spellCheck={false}
            placeholder="Lisää otsikko"
            onBlur={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default FileCard;
