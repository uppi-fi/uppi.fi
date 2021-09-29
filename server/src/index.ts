import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import * as path from "path";
import { db } from "./database";

dotenv.config();

const upload = multer({ dest: "uploads/" });
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.static("uploads"));

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.send("error");
  }

  fs.renameSync(
    path.join("uploads", req.file.filename),
    path.join("uploads", req.file.originalname),
  );

  // Insert into database
  const {
    rows: [row],
  } = await db.query<{ id: number }>(
    `INSERT INTO files (id, filename, mime_type, custom_name)
    VALUES ($1, $2, $3, $2)
    RETURNING id`,
    [nanoid(5), req.file.originalname, req.file.mimetype],
  );

  res.json({
    filename: req.file.originalname,
    fileId: row.id,
  });
});

app.get("/get-files", async (req, res) => {
  const { rows } = await db.query(`SELECT * FROM files`);
  res.json(rows);
});

app.get<{
  fileId: string;
}>("/get-file", async (req, res) => {
  const {
    rows: [row],
  } = await db.query(`SELECT * FROM files WHERE id=$1`, [req.query.fileId]);

  if (row) {
    res.json(row);
  } else {
    res.json({
      error: true,
    });
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
