import { UserIdParams } from '@shared/api';
import { env } from '@shared/config';
import { isVideoFile } from '@shared/mimetype';
import { FileT } from '@shared/schema';
import * as fs from 'fs';
import * as multer from 'multer';
import { nanoid } from 'nanoid';
import * as path from 'path';
import { postRoute } from '.';
import { authorization } from '..';
import { db } from '../database';
import { getFileLocalPath } from '../utils/file';
import { generateVideoThumbnail } from '../utils/videoThumbnails';

const upload = multer({ dest: 'uploads/' });

export const uploadRoute = () =>
  postRoute<FileT, UserIdParams>(
    '/upload',
    authorization,
    upload.single('file'),
    async (req, res) => {
      if (!req.file || env.DISABLED_MIME_TYPES.includes(req.file.mimetype)) {
        return res.sendStatus(400);
      }

      // Insert into database
      const fileId = nanoid(env.FILE_ID_LENGTH);
      const fileExtension = path.extname(req.file.originalname);
      const [row] = await db.any<FileT>(
        `INSERT INTO files (id, user_id, filename, custom_name, mime_type, file_extension, file_size)
      VALUES ($1, $2, $3, $3, $4, $5, $6)
      RETURNING *`,
        [
          fileId,
          req.body.userId,
          req.file.originalname,
          req.file.mimetype,
          fileExtension,
          req.file.size,
        ]
      );

      fs.mkdirSync(path.join('uploads', row.id));
      fs.renameSync(
        path.join('uploads', req.file.filename),
        getFileLocalPath(row)
      );

      // Generate thumbnail
      if (isVideoFile(row)) {
        generateVideoThumbnail(row);
      }

      res.json(row);
    }
  );
