import { Application } from "express";
import { db } from "../database";
import { FileT } from "../schema";

export const getFileRoute = (app: Application) =>
  app.get<
    {
      fileId: string;
    },
    FileT
  >("/get-file", async (req, res) => {
    const [file] = await db.any(`SELECT * FROM file WHERE id=$1`, [
      req.query.fileId,
    ]);

    if (file) {
      return res.json(file);
    }

    res.sendStatus(404);
  });
