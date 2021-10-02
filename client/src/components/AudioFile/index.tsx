import { FileT } from "../../schema";
import { getFileUrl } from "../../utils/url";
import styles from "./AudioFile.module.scss";

interface AudioFileProps {
  file: FileT;
}

function AudioFile({ file }: AudioFileProps) {
  return (
    <audio className={styles.audio} controls>
      <source src={getFileUrl(file)} type={file.mimeType} />
    </audio>
  );
}

export default AudioFile;
