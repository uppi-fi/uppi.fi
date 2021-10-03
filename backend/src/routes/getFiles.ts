import { FileT } from "@shared/schema";
import { Application } from "express";
import { db } from "../database";

export const getFilesRoute = (app: Application) =>
  app.get<FileT[], FileT[]>("/get-files", async (req, res) => {
    const files = await db.any<FileT>(
      `SELECT * FROM files WHERE user_id = $1`,
      [req.query.userId],
    );
    res.json(files);
  });
