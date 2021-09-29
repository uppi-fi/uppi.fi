import { Redirect } from "wouter";
import UploadArea from "../../components/UploadArea";
import { useUpload } from "../../services/useUpload";
import styles from "./UploadView.module.scss";

function UploadView() {
  const { upload, uploaded, progress } = useUpload();

  return (
    <div className={styles.root}>
      <UploadArea progress={progress} onShouldUpload={upload} />
      {uploaded && <Redirect to={`/${uploaded.fileId}`} />}
    </div>
  );
}

export default UploadView;
