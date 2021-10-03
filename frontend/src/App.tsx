import { UserT } from "@shared/schema";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation } from "wouter";
import styles from "./App.module.scss";
import DropOverlay from "./components/DropOverlay";
import Header from "./components/Header";
import Routes from "./routes";
import { useApiService } from "./services/useApiService";
import { currentUserState } from "./state/currentUserState";

const Access = () => {
  const [location, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const { get: getUser } = useApiService<UserT>("get-user");

  useEffect(() => {
    (async () => {
      let userId = currentUser?.userId;

      if (/^\/access\/[a-f0-9-]{36}$/.test(location)) {
        userId = location.split("/").pop();
        setLocation("/");
      }

      const user = await getUser({
        userId,
      });
      setCurrentUser(user);
    })();
  }, []);

  return null;
};

function App() {
  const [pageLoads, setPageLoads] = useState<number>();
  const { get: updateVisits } = useApiService<number>("visit");

  useEffect(() => {
    updateVisits().then(setPageLoads);
  }, []);

  return (
    <>
      <Access />

      <div className={styles.layout}>
        <Header pageLoads={pageLoads} />
        <Routes />
        <DropOverlay />
      </div>
    </>
  );
}

export default App;
