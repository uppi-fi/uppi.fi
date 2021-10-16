import { env } from '@shared/config';
import * as cors from 'cors';
import * as express from 'express';
import { deleteFileRoute } from './routes/deleteFile';
import { downloadRoute } from './routes/download';
import { getFileRoute } from './routes/getFile';
import { getFilesRoute } from './routes/getFiles';
import { getUserRoute } from './routes/getUser';
import { updateFileRoute } from './routes/updateFile';
import { uploadRoute } from './routes/upload';
import { visitRoute } from './routes/visit';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

getFileRoute(app);
getFilesRoute(app);
deleteFileRoute(app);
uploadRoute(app);
downloadRoute(app);
visitRoute(app);
getUserRoute(app);
updateFileRoute(app);

app.listen(env.BACKEND_PORT, () => {
  console.log(
    `Express server is running at http://localhost:${env.BACKEND_PORT}`
  );
});
