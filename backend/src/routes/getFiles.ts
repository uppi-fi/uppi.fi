import { FileT } from '@shared/schema';
import { getRoute } from '.';
import { authorization } from '..';
import { db } from '../database';

export const getFilesRoute = () =>
  getRoute<
    FileT[],
    {
      userId: string;
    }
  >('/get-files', authorization, async (req, res) => {
    const files = await db.any<FileT>(
      'SELECT * FROM files WHERE user_id = $1',
      [req.query.userId]
    );
    res.json(files);
  });
