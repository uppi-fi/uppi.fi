import { FileT } from '@shared/schema';
import FileCardMedia from '../FileCardMedia';
import FileNameInput from '../FileNameInput';
import styles from './FileCard.module.scss';

interface FileCardProps {
  file: FileT;
}

function FileCard({ file }: FileCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <FileCardMedia file={file} />
        <div className={styles.fileDetails}>
          <FileNameInput file={file} />
        </div>
      </div>
    </div>
  );
}

export default FileCard;
