import { FileT } from '@shared/schema';
import { Application } from 'express';
import { db } from '../database';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const updateFileRoute = (app: Application) =>
  app.post<
    unknown,
    FileT,
    Pick<FileT, 'id'> &
      Partial<Pick<FileT, 'customName' | 'filename' | 'viewCount'>>
  >('/update-file', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = req.body;
    const entries = Object.entries(rest);
    await db.query(
      `
      UPDATE files SET ${entries
        .map(([key], index) => {
          return `${camelToSnakeCase(key)} = $${index + 1}`;
        })
        .join(',\n')} WHERE id = $${entries.length + 1}`,
      entries.map(([, value]) => value).concat(req.body.id)
    );
    res.sendStatus(200);
  });
