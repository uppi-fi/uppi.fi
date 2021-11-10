import { useCurrentUser } from '@frontend/services/useCurrentUser';
import { Icon } from '@iconify/react';
import { FileT } from '@shared/schema';
import Tooltip from 'rc-tooltip';
import { formatDate } from '../../utils/time';
import { getFileDownloadUrl, getFileUrl } from '../../utils/url';
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
  const { currentUser } = useCurrentUser();

  return (
    <footer className={styles.root}>
      <Row alignItems="center" justifyContent="space-between">
        <Col gap="8px">
          {file.customName !== file.filename ? file.customName : file.filename}

          <Row
            alignItems="center"
            className={styles['file-details']}
            gap="20px"
          >
            <Tooltip
              placement="bottom"
              overlay="Latauspäivämäärä"
              mouseLeaveDelay={0}
              mouseEnterDelay={0.4}
            >
              <div className={styles.group}>
                <Icon icon="bx:bx-calendar" fontSize={18} />
                {formatDate(file.createdAt)}
              </div>
            </Tooltip>

            <Tooltip
              placement="bottom"
              overlay="Näyttökerrat"
              mouseLeaveDelay={0}
              mouseEnterDelay={0.4}
            >
              <div className={styles.group}>
                <Icon icon="ant-design:eye-twotone" fontSize={18} />
                {file.viewCount}
              </div>
            </Tooltip>
          </Row>
        </Col>

        <Row gap="4px">
          {currentUser?.userId === file.userId && (
            <DeleteButton fileId={file.id} />
          )}
          <CopyButton textToCopy={getFileUrl(file)} />
          <DownloadButton url={getFileDownloadUrl(file)} />
        </Row>
      </Row>
    </footer>
  );
}

export default FileFooter;
