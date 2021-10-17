import { Icon } from '@iconify/react';
import { FileT } from '@shared/schema';
import { clickEvent, useDoubleClick } from '@zattoo/use-double-click';
import noop from 'lodash-es/noop';
import Tooltip from 'rc-tooltip';
import { useMemo } from 'react';
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
  onClick?: clickEvent;
  onDoubleClick: clickEvent;
}

function FileCardMedia({
  file,
  onClick = noop,
  onDoubleClick,
}: FileCardMediaProps) {
  /** TODO: Maybe separate component from this? */
  const rendered = useMemo(() => {
    const fileUrl = getFileUrl(file);
    if (isImageFile(file)) {
      return <img src={fileUrl} alt={file.filename} draggable="false" />;
    }
    if (isVideoFile(file)) {
      return (
        <img
          src={getVideoPreviewUrl(file)}
          alt={file.filename}
          draggable="false"
        />
      );
    }
    if (isAudioFile(file)) {
      return <Icon icon="ant-design:sound-twotone" />;
    }
    return <Icon icon="ant-design:file-twotone" />;
  }, [file]);

  const doubleClickHandler = useDoubleClick(onDoubleClick);

  return (
    <div
      className={styles.media}
      onClick={(e) => {
        doubleClickHandler(e);
        onClick(e);
      }}
    >
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
        <Centered className={styles.content}>{rendered}</Centered>
      </Tooltip>
    </div>
  );
}

export default FileCardMedia;
