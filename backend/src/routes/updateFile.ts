import { UpdateFileParams } from '@shared/api';
import { FileT } from '@shared/schema';
import { postRoute } from '.';
import { authorization } from '..';
import { db } from '../database';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const updateFileRoute = () =>
  postRoute<FileT, UpdateFileParams>(
    '/update-file',
    authorization,
    async (req, res) => {
      const { id, ...rest } = req.body;
      const entries = Object.entries(rest);
      const file = await db.one<FileT>(
        `
      UPDATE files SET ${entries
        .map(([key], index) => {
          return `${camelToSnakeCase(key)} = $${index + 1}`;
        })
        .join(',\n')} WHERE id = $${entries.length + 1}
        RETURNING *`,
        entries.map(([, value]) => value).concat(req.body.id)
      );
      res.send(file);
    }
  );
