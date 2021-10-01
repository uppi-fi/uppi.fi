import { Application } from "express";
import { db } from "../database";

export const getFileRoute = (app: Application) =>
  app.get<{
    fileId: string;
  }>("/get-file", async (req, res) => {
    const [row] = await db.any(`SELECT * FROM file WHERE id=$1`, [
      req.query.fileId,
    ]);

    if (row) {
      res.json(row);
    } else {
      res.json({
        error: true,
      });
    }
  });
