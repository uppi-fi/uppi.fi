import { FileT } from "@shared/schema";
import { useRecoilValue } from "recoil";
import { autoPlayState } from "../../state/autoPlayState";
import { getFileUrl } from "../../utils/url";
import styles from "./AudioFile.module.scss";

interface AudioFileProps {
  file: FileT;
}

function AudioFile({ file }: AudioFileProps) {
  const autoPlay = useRecoilValue(autoPlayState);

  return (
    <audio autoPlay={autoPlay.audio} className={styles.audio} controls>
      <source src={getFileUrl(file)} type={file.mimeType} />
    </audio>
  );
}

export default AudioFile;
