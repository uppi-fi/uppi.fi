import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './App.module.scss';
import Centered from './components/Centered';
import DropOverlay from './components/DropOverlay';
import Header from './components/Header';
import Routes from './routes';
import { useApiService } from './services/useApiService';
import { useCheckAccess } from './services/useCheckAccess';
import { useIsFileView } from './services/useIsFileView';
import { currentUserState } from './state/currentUserState';

function App() {
  const [pageLoads, setPageLoads] = useState<number>();
  const { get: updateVisits } = useApiService<number>('visit');
  const currentUser = useRecoilValue(currentUserState);
  const { userVerified } = useCheckAccess();
  const isFileView = useIsFileView();

  useEffect(() => {
    updateVisits().then(setPageLoads);
  }, [updateVisits]);

  if (!userVerified) return null;

  return (
    <>
      <div className={styles.layout}>
        <Header pageLoads={pageLoads} />
        {!currentUser && !isFileView && location && (
          <Centered>
            <h3>Ei pääsyä 😡</h3>
          </Centered>
        )}
        <Routes />
        <DropOverlay />
      </div>
    </>
  );
}

export default App;
