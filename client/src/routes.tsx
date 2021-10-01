import { Route, Switch } from "wouter";
import FileView from "./views/FileView";
import ListingView from "./views/ListingView";
import UploadView from "./views/UploadView";

const Routes = () => (
  <Switch>
    <Route path="/" component={UploadView} />
    <Route path="/files" component={ListingView} />
    <Route path="/:fileId">{(params) => <FileView {...params} />}</Route>
  </Switch>
);

export default Routes;
