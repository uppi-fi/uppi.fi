import { useFileSelection } from '../../services/useFileSelection';
import { FileT } from '@shared/schema';
import FileCard from '../FileCard';
import styles from './FileCardGrid.module.scss';
import FileCardMedia from '../FileCardMedia';
import FileCardDetails from '../FileCardDetails';
import FileNameInput from '../FileNameInput';

type FileCardGridProps = {
  files: FileT[];
};

const FileCardGrid: React.FC<FileCardGridProps> = ({ files }) => {
  const { hasSelectedFileId, onClickFile, onDoubleClickFile, onClickAway } =
    useFileSelection();

  return (
    <div className={styles['file-card-grid']}>
      {files.map((file) => (
        <FileCard
          key={file.id}
          selected={hasSelectedFileId(file.id)}
          onClickAway={onClickAway}
        >
          <FileCardMedia
            file={file}
            onClick={() => onClickFile(file)}
            onDoubleClick={() => onDoubleClickFile(file)}
          />
          <FileCardDetails>
            <FileNameInput file={file} />
          </FileCardDetails>
        </FileCard>
      ))}
    </div>
  );
};

export default FileCardGrid;
