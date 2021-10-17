import { FileT } from '@shared/schema';
import {
  isAudioFile,
  isImageFile,
  isVideoFile,
} from '../../../../shared/mimetype';
import AudioFile from '../../components/AudioFile';
import FileFooter from '../../components/FileFooter';
import ImageFile from '../../components/ImageFile';
import VideoFile from '../../components/VideoFile';
import styles from './File.module.scss';

interface FileProps {
  file: FileT;
}

const File: React.FC<FileProps> = ({ file }) => {
  const renderFile = () => {
    if (isVideoFile(file)) {
      return <VideoFile file={file} />;
    }
    if (isImageFile(file)) {
      return <ImageFile file={file} />;
    }
    if (isAudioFile(file)) {
      return <AudioFile file={file} />;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.file}>{renderFile()}</div>
      <FileFooter file={file} />
    </div>
  );
};

export default File;
