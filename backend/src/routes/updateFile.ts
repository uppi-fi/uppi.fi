import { FileT } from '@shared/schema';
import { postRoute } from '.';
import { authorization } from '..';
import { db } from '../database';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const updateFileRoute = () =>
  postRoute<
    FileT,
    Pick<FileT, 'id'> &
      Partial<Pick<FileT, 'customName' | 'filename' | 'viewCount'>>
  >('/update-file', authorization, async (req, res) => {
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
