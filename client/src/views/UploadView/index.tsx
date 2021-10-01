import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import UploadArea from "../../components/UploadArea";
import { appState } from "../../state/appState";
import styles from "./UploadView.module.scss";

function UploadView() {
  const setAppState = useSetRecoilState(appState);

  useEffect(() => {
    setAppState((old) => ({
      ...old,
      uploadProgress: 0,
    }));
  }, []);

  return (
    <div className={styles.root}>
      <UploadArea />
    </div>
  );
}

export default UploadView;
