import { Application } from "express";
import { FileT } from "shared";
import { db } from "../database";

export const getFilesRoute = (app: Application) =>
  app.get<FileT[]>("/get-files", async (req, res) => {
    const rows = await db.any<FileT[]>(`SELECT * FROM file`);
    res.json(rows);
  });
