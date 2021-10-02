import { FileT } from "../../schema";
import { getFileUrl } from "../../utils/url";
import styles from "./ImageFile.module.scss";

interface ImageFileProps {
  file: FileT;
}

function ImageFile({ file }: ImageFileProps) {
  const imageUrl = getFileUrl(file);

  return (
    <a href={imageUrl}>
      <img className={styles.image} src={imageUrl} alt={file.filename} />
    </a>
  );
}

export default ImageFile;
