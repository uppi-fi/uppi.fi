import { appConfig } from "@shared/config";
import { isVideoFile } from "@shared/mimetype";
import { FileT } from "@shared/schema";
import { Application } from "express";
import * as fs from "fs";
import * as multer from "multer";
import { nanoid } from "nanoid";
import * as path from "path";
import { db } from "../database";
import { getFileLocalPath } from "../utils/file";
import { generateVideoThumbnail } from "../utils/videoThumbnails";

const upload = multer({ dest: "uploads/" });

export const uploadRoute = (app: Application) =>
  app.post<
    {},
    FileT,
    {
      userId: string;
    }
  >("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.sendStatus(400);
    }

    // Insert into database
    const fileId = nanoid(appConfig.fileIdLength);
    const fileExtension = path.extname(req.file.originalname);
    const [row] = await db.any<FileT>(
      `INSERT INTO files (id, user_id, filename, custom_name, mime_type, file_extension)
      VALUES ($1, $2, $3, $3, $4, $5)
      RETURNING *`,
      [
        fileId,
        req.body.userId,
        req.file.originalname,
        req.file.mimetype,
        fileExtension,
      ],
    );

    fs.mkdirSync(path.join("uploads", row.id));
    fs.renameSync(
      path.join("uploads", req.file.filename),
      getFileLocalPath(row),
    );

    // Generate thumbnail
    if (isVideoFile(row)) {
      generateVideoThumbnail(row);
    }

    res.json(row);
  });
