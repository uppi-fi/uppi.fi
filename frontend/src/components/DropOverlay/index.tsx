import cx from 'classnames';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'wouter';
import useDrop from '../../services/useDrop';
import { useUpload } from '../../services/useUpload';
import { draggingState } from '../../state/draggingState';
import styles from './DropOverlay.module.scss';

function DropOverlay() {
  const upload = useUpload();
  const [, setLocation] = useLocation();
  const [dragging, setDragging] = useRecoilState(draggingState);

  const state = useDrop({
    onFiles: (files: File[]) => {
      if (files.length === 1) {
        setLocation('/');
        upload(files[0]);
      }
    },
  });

  useEffect(() => {
    setDragging(state.over);
  }, [state.over]);

  return (
    <div
      className={cx(styles.root, {
        [styles.visible]: dragging,
      })}
    >
      Pudota tiedosto
    </div>
  );
}

export default DropOverlay;
