import { Application } from "express";
import * as path from "path";
import { db } from "../database";

export const downloadRoute = (app: Application) =>
  app.get<{
    fileId: string;
  }>("/dl", async (req, res) => {
    const { fileId } = req.query;
    if (typeof fileId !== "string") return;
    const [row] = await db.any(`SELECT filename FROM files WHERE id=$1`, [
      fileId,
    ]);

    if (!row) {
      return res.json({
        error: true,
      });
    }

    res.download(
      path.resolve(__dirname, "../../uploads", fileId, row.filename),
    );
  });
