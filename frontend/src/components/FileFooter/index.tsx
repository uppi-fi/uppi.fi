import { Icon } from '@iconify/react';
import { FileT } from '@shared/schema';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../state/currentUserState';
import { formatDate } from '../../utils/time';
import { getFileUrl } from '../../utils/url';
import Col from '../atoms/Col';
import Row from '../atoms/Row';
import CopyButton from '../CopyButton';
import DeleteButton from '../DeleteButton';
import DownloadButton from '../DownloadButton';
import styles from './FileFooter.module.scss';

interface FileFooterProps {
  file: FileT;
}

function FileFooter({ file }: FileFooterProps) {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <footer className={styles.root}>
      <Row alignItems="center" justifyContent="space-between">
        <Col gap="8px">
          {file.customName !== file.filename ? file.customName : file.filename}
          <Row alignItems="center" className={styles.date}>
            {formatDate(file.createdAt)}
            <Icon icon="bx:bx-calendar" fontSize={18} />{' '}
          </Row>
        </Col>

        <Row gap="4px">
          {currentUser?.userId === file.userId && (
            <DeleteButton fileId={file.id} />
          )}
          <CopyButton textToCopy={getFileUrl(file)} />
          <DownloadButton fileId={file.id} />
        </Row>
      </Row>
    </footer>
  );
}

export default FileFooter;
