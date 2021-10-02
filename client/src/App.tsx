import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import DropOverlay from "./components/DropOverlay";
import Header from "./components/Header";
import Routes from "./routes";
import { getServerUrl } from "./utils/url";

function App() {
  const [pageLoads, setPageLoads] = useState<number>();

  useEffect(() => {
    axios
      .get<number>(getServerUrl("visit"))
      .then(({ data }) => setPageLoads(data));
  }, []);

  return (
    <div className={styles.layout}>
      <Header pageLoads={pageLoads} />
      <Routes />
      <DropOverlay />
    </div>
  );
}
export default App;
