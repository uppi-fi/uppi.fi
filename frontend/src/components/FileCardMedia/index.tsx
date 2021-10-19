import { FileT } from '@shared/schema';
import { clickEvent, useDoubleClick } from '@zattoo/use-double-click';
import Tooltip from 'rc-tooltip';
import React, { useMemo } from 'react';
import { getFileUrl, getVideoPreviewUrl } from '../../utils/url';
import Centered from '../Centered';
import FileIcon from '../FileIcon';
import styles from './FileCardMedia.module.scss';

interface FileCardMediaProps {
  file: FileT;
  onClick?: (e: React.MouseEvent) => void;
  onDoubleClick: clickEvent;
}

function FileCardMedia({ file, onClick, onDoubleClick }: FileCardMediaProps) {
  const doubleClickHandler = useDoubleClick(onDoubleClick);

  return (
    <div
      className={styles.media}
      onClick={(e) => {
        doubleClickHandler(e);
        onClick?.(e);
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
        <Centered className={styles.content}>
          <FileIcon file={file} />
        </Centered>
      </Tooltip>
    </div>
  );
}

export default FileCardMedia;
