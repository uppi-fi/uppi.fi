import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import UploadArea from '../../components/UploadArea';
import { uploadProgresState } from '../../state/uploadProgresState';
import styles from './UploadView.module.scss';

function UploadView() {
  const setUploadProgress = useSetRecoilState(uploadProgresState);

  useEffect(() => {
    setUploadProgress(0);
  }, []);

  return (
    <div className={styles.root}>
      <UploadArea />
    </div>
  );
}

export default UploadView;
