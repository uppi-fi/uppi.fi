import { Application } from "express";
import * as fs from "fs";
import * as path from "path";
import { db } from "../database";
import { FileT } from "../schema";

export const deleteFileRoute = (app: Application) =>
  app.post<{
    fileId: string;
  }>("/delete-file", async (req, res) => {
    // Update DB
    const { filename, id } = await db.one<Pick<FileT, "id" | "filename">>(
      `DELETE FROM file
      WHERE id=$1
      RETURNING id, filename`,
      [req.query.fileId],
    );

    // Delete file & directory
    const filepath = path.join("uploads", id, filename);
    fs.unlinkSync(filepath);
    fs.rmdirSync(path.dirname(filepath));
    res.send("ok");
  });
