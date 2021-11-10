import { ApiMessage, DeleteFileResponse, FileIdParams } from '@shared/api';
import { FileT } from '@shared/schema';
import * as fs from 'fs';
import * as path from 'path';
import pgPromise from 'pg-promise';
import { deleteRoute } from '.';
import { authorization } from '..';
import { db } from '../database';

export const deleteFileRoute = () =>
  deleteRoute<DeleteFileResponse, FileIdParams>(
    '/delete-file',
    authorization,
    async (req, res) => {
      try {
        // Update DB
        const { id, filename } = await db.one<Pick<FileT, 'id' | 'filename'>>(
          `DELETE FROM files
        WHERE id=$1
        RETURNING id, filename`,
          [req.params.fileId]
        );

        // Delete file & directory
        const dir = path.join('uploads', id);
        fs.rmdirSync(dir, { recursive: true });
        res.send({
          message: ApiMessage.Ok,
          id,
          filename,
        });
      } catch (error: unknown) {
        if (error instanceof pgPromise.errors.QueryResultError) {
          if (!error.code) {
            res.send({
              message: ApiMessage.NotFound,
            });
            return;
          }
          res.send({
            message: ApiMessage.PgError,
          });
          console.error(`Failed to delete file:\n${error}`);
          return;
        }
        console.error(error);
      }
    }
  );
