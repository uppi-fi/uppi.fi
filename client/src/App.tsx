import { useRecoilValue } from "recoil";
import { Redirect } from "wouter";
import styles from "./App.module.scss";
import DropOverlay from "./components/DropOverlay";
import Header from "./components/Header";
import Routes from "./routes";
import { uploadedFileState } from "./state/uploadedFileState";

function App() {
  const uploadedFile = useRecoilValue(uploadedFileState);

  return (
    <div className={styles.layout}>
      <Header />
      <Routes />
      <DropOverlay />
      {uploadedFile && (
        <Redirect key={uploadedFile.id} to={`/${uploadedFile.id}`} />
      )}
    </div>
  );
}
export default App;
