import { useCurrentUser } from '@frontend/services/useCurrentUser';
import { useEffect, useState } from 'react';
import { Redirect } from 'wouter';
import { BackButtonLink } from '../../components/BackButton';
import File from '../../components/File';
import { useFile } from '../../services/useFile';
import NotFoundView from '../NotFoundView';
import styles from './FileView.module.scss';

interface FileViewProps {
  fileId: string;
}

function FileView({ fileId }: FileViewProps) {
  const { currentUser } = useCurrentUser();
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

  return (
    <div className={styles['file-view-container']}>
      {currentUser && (
        <BackButtonLink href="/files">
          Takaisin omiin tiedostoihin
        </BackButtonLink>
      )}
      <File file={currentFile} />
    </div>
  );
}

export default FileView;
