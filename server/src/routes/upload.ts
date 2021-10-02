import { Application } from "express";
import * as fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import * as path from "path";
import { db } from "../database";
import { FileT } from "../schema";

const upload = multer({ dest: "uploads/" });

export const uploadRoute = (app: Application) =>
  app.post<{}, FileT>("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.sendStatus(400);
    }

    // Insert into database
    const fileId = nanoid(5);
    const [row] = await db.any<FileT>(
      `INSERT INTO file (id, filename, custom_name, mime_type)
      VALUES ($1, $2, $2, $3)
      RETURNING *`,
      [fileId, req.file.originalname, req.file.mimetype],
    );

    fs.mkdirSync(path.join("uploads", row.id));
    fs.renameSync(
      path.join("uploads", req.file.filename),
      path.join("uploads", row.id, req.file.originalname),
    );

    res.json(row);
  });
