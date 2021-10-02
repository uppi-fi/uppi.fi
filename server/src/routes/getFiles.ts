import { Application } from "express";
import { db } from "../database";
import { FileT } from "../schema";

export const getFilesRoute = (app: Application) =>
  app.get<FileT[]>("/get-files", async (req, res) => {
    const rows = await db.any<FileT[]>(`SELECT * FROM file`);
    res.json(rows);
  });
