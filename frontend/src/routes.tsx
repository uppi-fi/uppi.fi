import { Route, Switch } from 'wouter';
import { useCurrentUser } from './services/useCurrentUser';
import FileView from './views/FileView';
import OwnFiles from './views/OwnFilesView';
import UploadView from './views/UploadView';

const Routes = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Switch>
      {currentUser ? (
        <>
          <Route path="/" component={UploadView} />
          <Route path="/files/:fileId?" component={OwnFiles} />
        </>
      ) : (
        <>ei pääsyä</>
      )}
      <Route path="/files/:fileId">
        {(params) => <FileView {...params} />}
      </Route>
    </Switch>
  );
};

export default Routes;
