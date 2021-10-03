import { useEffect, useState } from 'react';
import { Redirect } from 'wouter';
import {
  isAudioFile,
  isImageFile,
  isVideoFile,
} from '../../../../shared/mimetype';
import AudioFile from '../../components/AudioFile';
import FileFooter from '../../components/FileFooter';
import ImageFile from '../../components/ImageFile';
import VideoFile from '../../components/VideoFile';
import { useFile } from '../../services/useFile';
import NotFoundView from '../NotFoundView';
import styles from './FileView.module.scss';

interface FileViewProps {
  fileId: string;
}

function FileView({ fileId }: FileViewProps) {
  const { currentFile, error } = useFile(fileId);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);
    }
  }, [error]);

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <NotFoundView />;
  }

  if (!currentFile) {
    return null;
  }

  const renderFile = () => {
    if (isVideoFile(currentFile)) {
      return <VideoFile file={currentFile} />;
    }
    if (isImageFile(currentFile)) {
      return <ImageFile file={currentFile} />;
    }
    if (isAudioFile(currentFile)) {
      return <AudioFile file={currentFile} />;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.file}>{renderFile()}</div>
      <FileFooter file={currentFile} />
    </div>
  );
}

export default FileView;
