import { FileT } from '@shared/schema';
import * as fs from 'fs';
import * as path from 'path';
import pgPromise from 'pg-promise';
import { postRoute } from '.';
import { authorization } from '..';
import { db } from '../database';
import { ResponseStatus } from '../types';

export const deleteFileRoute = () =>
  postRoute<
    {},
    {
      fileId: string;
    }
  >('/delete-file', authorization, async (req, res) => {
    try {
      // Update DB
      const { id } = await db.one<Pick<FileT, 'id' | 'filename'>>(
        `DELETE FROM files
        WHERE id=$1
        RETURNING id, filename`,
        [req.body.fileId]
      );

      // Delete file & directory
      const dir = path.join('uploads', id);
      fs.rmdirSync(dir, { recursive: true });
      res.send({
        status: ResponseStatus.Ok,
      });
    } catch (error: unknown) {
      if (error instanceof pgPromise.errors.QueryResultError) {
        if (!error.code) {
          res.send({
            status: ResponseStatus.Error,
            message: 'Could not find file',
          });
        }
        res.send(ResponseStatus.Error);
        res.status(500);
        console.error(`Failed to delete file:\n${error}`);
        return;
      }
      console.error(error);
    }
  });
