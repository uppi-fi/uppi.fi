import { Icon } from '@iconify/react';
import FileListSorters from '../../components/FileListSorters';
import Spinner from '../../components/Spinner';
import styles from './OwnFiles.module.scss';
import Modal from '../../components/Modal';
import { Route, useLocation } from 'wouter';
import File from '../../components/File';
import { useFile } from '../../services/useFile';
import { useFetchFiles } from '../../services/useFetchFiles';
import Skeleton from '../../components/Skeleton';
import { times } from 'lodash-es';
import Result from '../../components/Result';
import { LinkButton } from '../../components/Button';
import FileCardGrid from '../../components/FileCardGrid';

function OwnFiles() {
  const { files, error } = useFetchFiles();

  return (
    <div>
      <div className={styles.main}>
        <header className={styles['page-header']}>
          <Icon
            icon="bx:bxs-face"
            color="#545454"
            style={{
              height: '40px',
              width: '40px',
              paddingRight: '10px',
            }}
          />
          <h2>Omat tiedostot</h2>
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
