import { Icon } from '@iconify/react';
import cx from 'classnames';
import { memo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useUpload } from '../../services/useUpload';
import { draggingState } from '../../state/draggingState';
import { uploadProgresState } from '../../state/uploadProgresState';
import Col from '../atoms/Col';
import Text from '../atoms/Text';
import styles from './UploadArea.module.scss';

function UploadArea() {
  const upload = useUpload();
  const uploadProgress = useRecoilValue(uploadProgresState);
  const dragging = useRecoilValue(draggingState);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: File[] | FileList | null) => {
    if (files?.length === 1) {
      upload(files[0]);
    }
  };

  return (
    <div
      className={cx(styles.root, {
        [styles.active]: dragging,
      })}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={(evt) => onFiles(evt.currentTarget.files)}
      />
      <div
        className={styles.fill}
        style={{
          height: `${uploadProgress * 100}%`,
        }}
      />
      {uploadProgress === 0 ? (
        <Col alignItems="center" gap="8px">
          <Icon icon="entypo:upload-to-cloud" color="#2a9d8f" fontSize="20vh" />
          <Text
            marginTop="-8px" // Icon has lots of space on bottom, let's negate some of that
            fontSize="clamp(13px, 4vh, 24px)"
            fontWeight="bold"
          >
            Lisää tiedosto
          </Text>
        </Col>
      ) : (
        `${Math.round(uploadProgress * 100)}%`
      )}
    </div>
  );
}

export default memo(UploadArea);
