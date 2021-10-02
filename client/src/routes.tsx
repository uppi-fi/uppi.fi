import { useRecoilValue } from "recoil";
import { Route, Switch } from "wouter";
import { currentUserState } from "./state/currentUserState";
import FileView from "./views/FileView";
import ListingView from "./views/ListingView";
import UploadView from "./views/UploadView";

const Routes = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Switch>
      {currentUser ? (
        <>
          <Route path="/" component={UploadView} />
          <Route path="/files" component={ListingView} />
        </>
      ) : (
        <></>
      )}
      <Route path="/:fileId">{(params) => <FileView {...params} />}</Route>
    </Switch>
  );
};

export default Routes;
