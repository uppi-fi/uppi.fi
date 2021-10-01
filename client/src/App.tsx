import { useRecoilValue } from "recoil";
import { Redirect } from "wouter";
import styles from "./App.module.scss";
import Header from "./components/Header";
import Routes from "./routes";
import { useDragAndDrop } from "./services/useDragAndDrop";
import { appState } from "./state/appState";

function App() {
  const { uploadedFile } = useRecoilValue(appState);
  const bond = useDragAndDrop();

  return (
    <div {...bond} className={styles.layout}>
      <Header />
      <Routes />
      {uploadedFile && (
        <Redirect key={uploadedFile.id} to={`/${uploadedFile.id}`} />
      )}
    </div>
  );
}
export default App;
