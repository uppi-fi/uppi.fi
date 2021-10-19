import { Icon } from '@iconify/react';
import times from 'lodash-es/times';
import { Route, useLocation } from 'wouter';
import { LinkButton } from '../../components/Button';
import File from '../../components/File';
import FileCardGrid from '../../components/FileCardGrid';
import FileListSorters from '../../components/FileListSorters';
import Modal from '../../components/Modal';
import Result from '../../components/Result';
import Skeleton from '../../components/Skeleton';
import Spinner from '../../components/Spinner';
import { useFetchFiles } from '../../services/useFetchFiles';
import { useFile } from '../../services/useFile';
import styles from './OwnFiles.module.scss';

function OwnFiles() {
  const { files, error } = useFetchFiles();

  return (
    <div>
      <div className={styles.main}>
        <header className={styles['page-header']}>
          <LinkButton to="/" kind="primary">
            Lisää tiedosto
          </LinkButton>
          <span className={styles['page-header--details']}>
            ...tai raahaa ja pudota
          </span>
          <FileListSorters />
        </header>

        {!files &&
          !error &&
          times(6, (i) => (
            <Skeleton key={i} style={{ height: '130px', width: '100%' }} />
          ))}
        {files && files.length === 0 && (
          <Result
            icon={<Icon icon="bx:bx-bulb" />}
            status="info"
            title="Ei tiedostoja"
            subTitle="Lisää ensimmäinen tiedostosi napsauttamalla alta."
            extra={
              <LinkButton href="/" kind="primary">
                Lataa tiedosto
              </LinkButton>
            }
          />
        )}
        {files && files.length > 0 && <FileCardGrid files={files} />}
        {error && (
          <Result
            status="500"
            title="500"
            subTitle="Pahoittelut, jotain meni pieleen"
          />
        )}
      </div>
      {/* Adds some spacing so we can scroll further */}
      <div className={styles.spacer} />

      <Route path="/files/:fileId">
        {({ fileId }) => <FileModal fileId={fileId} />}
      </Route>
    </div>
  );
}

const FileModal: React.FC<{ fileId: string }> = ({ fileId }) => {
  const [, setLocation] = useLocation();
  const { currentFile, error } = useFile(fileId);

  return (
    <Modal onClickOutside={() => setLocation('/files')}>
      {currentFile && <File file={currentFile} />}
      {error && (
        <>
          <b>Virhe ladattaessa tiedostoa!</b> <p>Yritä uudelleen myöhemmin.</p>
        </>
      )}
      {!error && !currentFile && <Spinner />}
    </Modal>
  );
};

export default OwnFiles;
