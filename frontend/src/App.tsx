import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './App.module.scss';
import DropOverlay from './components/DropOverlay';
import Header from './components/Header';
import Routes from './routes';
import { useApiService } from './services/useApiService';
import { useAuthentication } from './services/useCheckAccess';
import { useIsFileView } from './services/useIsFileView';
import { currentUserState } from './state/currentUserState';
import Login from './views/Login';

function App() {
  const [pageLoads, setPageLoads] = useState<number>();
  const { get: updateVisits } = useApiService<number>('visit');
  const currentUser = useRecoilValue(currentUserState);
  const { userVerified } = useAuthentication();
  const isFileView = useIsFileView();

  useEffect(() => {
    updateVisits().then(setPageLoads);
  }, [updateVisits]);

  if (!userVerified) return null;

  return (
    <>
      <div className={styles.layout}>
        <Header pageLoads={pageLoads} />
        {!currentUser && !isFileView && location && <Login />}
        <Routes />
        <DropOverlay />
      </div>
    </>
  );
}

export default App;
