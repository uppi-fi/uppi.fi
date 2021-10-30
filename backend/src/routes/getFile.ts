import { FileT } from '@shared/schema';
import { getRoute } from '.';
import { db } from '../database';

export const getFileRoute = () =>
  getRoute<
    FileT,
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
