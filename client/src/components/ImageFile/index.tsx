import { FileT } from "shared";
import { getServerUrl } from "../../utils/url";
import styles from "./ImageFile.module.scss";

interface ImageFileProps {
  file: FileT;
}

function ImageFile({ file }: ImageFileProps) {
  const imageUrl = getServerUrl(file.filename);

  return (
    <a href={imageUrl}>
      <img className={styles.image} src={imageUrl} alt={file.filename} />
    </a>
  );
}

export default ImageFile;
