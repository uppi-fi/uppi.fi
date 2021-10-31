import { Icon } from '@iconify/react';
import times from 'lodash-es/times';
import { Route } from 'wouter';
import { LinkButton } from '../../components/Button';
import FileCardGrid from '../../components/FileCardGrid';
import FileListSorters from '../../components/FileListSorters';
import FileModal from '../../components/FileModal';
import Result from '../../components/Result';
import Skeleton from '../../components/Skeleton';
import { useFetchFiles } from '../../services/useFetchFiles';
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

export default OwnFiles;
