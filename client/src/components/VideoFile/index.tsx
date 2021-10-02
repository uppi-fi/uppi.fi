import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import { FileT } from "shared";
import { getFileUrl } from "../../utils/url";
import styles from "./VideoFile.module.scss";

interface VideoFileProps {
  file: FileT;
}

function VideoFile({ file }: VideoFileProps) {
  const [autoPlay] = useLocalStorage("autoPlay", false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousFileId = useRef(file.id);

  useEffect(() => {
    if (previousFileId.current === file.id) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousFileId.current = file.id;
  }, [file.id]);

  return (
    <video ref={videoRef} autoPlay={autoPlay} className={styles.video} controls>
      <source src={getFileUrl(file)} type={file.mimeType} />
    </video>
  );
}
export default VideoFile;
