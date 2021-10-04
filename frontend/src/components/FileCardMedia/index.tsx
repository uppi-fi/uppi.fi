import { Icon } from '@iconify/react';
import { FileT } from '@shared/schema';
import Tooltip from 'rc-tooltip';
import { useMemo } from 'react';
import { useLocation } from 'wouter';
import {
  isAudioFile,
  isImageFile,
  isVideoFile,
} from '../../../../shared/mimetype';
import { getFileUrl, getVideoPreviewUrl } from '../../utils/url';
import Centered from '../Centered';
import styles from './FileCardMedia.module.scss';

interface FileCardMediaProps {
  file: FileT;
}

function FileCardMedia({ file }: FileCardMediaProps) {
  const [, setLocation] = useLocation();
  const fileUrl = getFileUrl(file);

  /** TODO: Maybe separate component from this? */
  const rendered = useMemo(() => {
    if (isImageFile(file)) {
      return <img src={fileUrl} alt={file.filename} />;
    }
    if (isVideoFile(file)) {
      return <img src={getVideoPreviewUrl(file)} alt={file.filename} />;
    }
    if (isAudioFile(file)) {
      return <Icon icon="ant-design:sound-twotone" />;
    }
    return <Icon icon="ant-design:file-twotone" />;
  }, [file.id]);

  return (
    <div className={styles.media} onClick={() => setLocation(`/${file.id}`)}>
      <div className={styles.fileType}>
        {file.fileExtension.replace(/./, '')}
      </div>
      <Tooltip
        placement="top"
        overlay={`Tyyppi: ${file.mimeType}`}
        mouseLeaveDelay={0}
        overlayStyle={{
          top: '0 !important',
        }}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
      >
        <Centered>{rendered}</Centered>
      </Tooltip>
    </div>
  );
}

export default FileCardMedia;
