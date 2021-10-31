import * as express from 'express';
import { deleteFileRoute } from './deleteFile';
import { downloadRoute } from './download';
import { getFileRoute } from './getFile';
import { getFilesRoute } from './getFiles';
import { getUserRoute } from './getUser';
import { loginRoute } from './login';
import { registerRoute } from './register';
import { updateFileRoute } from './updateFile';
import { uploadRoute } from './upload';
import { visitRoute } from './visit';

let app: express.Application;

export function registerRoutes(expressApp: express.Application) {
  app = expressApp;

  // Authentication
  loginRoute();
  registerRoute();

  // App routes
  deleteFileRoute();
  downloadRoute();
  getFileRoute();
  getFilesRoute();
  getUserRoute();
  updateFileRoute();
  uploadRoute();
  visitRoute();
}

export function getRoute<TData, TParams>(
  path: string,
  ...handlers: express.RequestHandler<
    any,
    TData,
    any,
    TParams,
    Record<string, any>
  >[]
) {
  app.get<unknown, TData, unknown, TParams>(path, ...handlers);
}

export function postRoute<TData, TParams>(
  path: string,
  ...handlers: express.RequestHandler<any, TData, TParams>[]
) {
  app.post<unknown, TData, TParams>(path, ...handlers);
}
