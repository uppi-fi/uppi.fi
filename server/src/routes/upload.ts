import { Application } from "express";
import * as fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import * as path from "path";
import { FileT } from "shared";
import { db } from "../database";

const upload = multer({ dest: "uploads/" });

export const uploadRoute = (app: Application) =>
  app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.send("error");
    }

    fs.renameSync(
      path.join("uploads", req.file.filename),
      path.join("uploads", req.file.originalname),
    );

    // Insert into database
    const fileId = nanoid(5);
    const [row] = await db.any<
      Pick<FileT, "id" | "filename" | "customName" | "mimeType">
    >(
      `INSERT INTO file (id, filename, custom_name, mime_type)
    VALUES ($1, $2, $2, $3)
    RETURNING *`,
      [fileId, req.file.originalname, req.file.mimetype],
    );
    res.json(row);
  });
