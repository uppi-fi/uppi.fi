import { FileT } from '@shared/schema';
import { Application } from 'express';
import { db } from '../database';

export const getFileRoute = (app: Application) =>
  app.get<
    unknown,
    FileT,
    unknown,
    {
      fileId: string;
    }
  >('/get-file', async (req, res) => {
    const [file] = await db.any('SELECT * FROM files WHERE id=$1', [
      req.query.fileId,
    ]);

    if (file) {
      return res.json(file);
    }

    res.sendStatus(404);
  });
