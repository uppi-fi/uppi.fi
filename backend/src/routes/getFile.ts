import { FileIdParams } from '@shared/api';
import { FileT } from '@shared/schema';
import { getRoute } from '.';
import { db } from '../database';

export const getFileRoute = () =>
  getRoute<FileT, FileIdParams>('/get-file', async (req, res) => {
    const file = await db.oneOrNone<FileT>('SELECT * FROM files WHERE id=$1', [
      req.query.fileId,
    ]);

    if (file) {
      // Update view count
      await db.query<Pick<FileT, 'viewCount'>>(
        'UPDATE files SET view_count = view_count + 1 WHERE id = $1',
        [file.id]
      );

      return res.json({
        ...file,
        viewCount: file.viewCount + 1,
      });
    }

    res.sendStatus(404);
  });
