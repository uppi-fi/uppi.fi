import styles from '../../App.module.scss';
import DropOverlay from '@frontend/components/DropOverlay';
import Header from '@frontend/components/Header';
import Toaster from '@frontend/components/Toaster';
import Routes from '@frontend/routes';
import { useIsFileView } from '@frontend/services/useIsFileView';
import Login from '@frontend/views/Login';
import { useCurrentUser } from '@frontend/services/useCurrentUser';
import { fetchVisits, useApi } from '@frontend/api';

function Authenticated() {
  const { currentUser } = useCurrentUser();
  const { data: pageLoads } = useApi(fetchVisits);
  const isFileView = useIsFileView();

  return (
    <>
      <Toaster />
      <div className={styles.layout}>
        <Header pageLoads={pageLoads ?? 0} />
        {!currentUser && !isFileView && location && <Login />}
        <Routes />
        <DropOverlay />
      </div>
    </>
  );
}

export default Authenticated;
