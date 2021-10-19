import { FileT } from '@shared/schema';
import { getFileUrl } from '../../utils/url';
import ImageWithFallback from '../ImageWithFallback';
import styles from './ImageFile.module.scss';

interface ImageFileProps {
  file: FileT;
}

function ImageFile({ file }: ImageFileProps) {
  const imageUrl = getFileUrl(file);

  return (
    <a href={imageUrl}>
      <ImageWithFallback
        fallback={() => null}
        className={styles.image}
        src={imageUrl}
        alt={file.filename}
      />
    </a>
  );
}

export default ImageFile;
