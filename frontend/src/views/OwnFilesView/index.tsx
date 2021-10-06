import { Icon } from '@iconify/react';
import { FileT } from '@shared/schema';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Row from '../../components/atoms/Row';
import Centered from '../../components/Centered';
import FileCard from '../../components/FileCard';
import FileListSorters from '../../components/FileListSorters';
import Spinner from '../../components/Spinner';
import { useApiService } from '../../services/useApiService';
import { currentUserState } from '../../state/currentUserState';
import { fileListState } from '../../state/fileList/fileListState';
import { sortedFileListState } from '../../state/fileList/sortedFileListState';
import styles from './OwnFiles.module.scss';

function OwnFiles() {
  const currentUser = useRecoilValue(currentUserState);
  const { data: apiFiles, get: fetch } = useApiService<FileT[]>('get-files');
  const setFiles = useSetRecoilState(fileListState);
  const files = useRecoilValue(sortedFileListState);

  useEffect(() => {
    if (apiFiles) setFiles(apiFiles);
  }, [apiFiles]);

  useEffect(() => {
    if (currentUser) {
      fetch({
        userId: currentUser.userId,
      });
    }
  }, []);

  if (!files) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  if (!files.length) {
    return (
      <Centered className={styles.row}>
        <Row alignItems="center" gap="8px">
          <Icon icon="entypo:emoji-sad" fontSize={25} /> Et ole vielä lisännyt
          tiedostoja
        </Row>
      </Centered>
    );
  }

  return (
    <div>
      <div className={styles.main}>
        <h2>
          Tiedostot
          <FileListSorters />
        </h2>

        <div className={styles.grid}>
          {files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      </div>
      {/* Adds some spacing so we can scroll further */}
      <div className={styles.spacer} />
    </div>
  );
}

export default OwnFiles;
