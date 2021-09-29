import { Route, Switch } from "wouter";
import FileView from "./views/File";
import ListView from "./views/List";
import UploadView from "./views/Upload";

const Routes = () => (
  <Switch>
    <Route path="/" component={UploadView} />
    <Route path="/files" component={ListView} />
    <Route path="/:fileId">{(params) => <FileView {...params} />}</Route>
  </Switch>
);

export default Routes;
