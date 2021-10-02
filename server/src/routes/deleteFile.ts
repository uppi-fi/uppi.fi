import { Application } from "express";
import * as fs from "fs";
import * as path from "path";
import pgPromise from "pg-promise";
import { db } from "../database";
import { FileT } from "../schema";
import { ResponseStatus } from "../types";

export const deleteFileRoute = (app: Application) =>
  app.post<
    {},
    {},
    {
      fileId: string;
    }
  >("/delete-file", async (req, res) => {
    try {
      // Update DB
      const { filename, id } = await db.one<Pick<FileT, "id" | "filename">>(
        `DELETE FROM file
        WHERE id=$1
        RETURNING id, filename`,
        [req.body.fileId],
      );

      // Delete file & directory
      const filepath = path.join("uploads", id, filename);
      fs.unlinkSync(filepath);
      fs.rmdirSync(path.dirname(filepath));
      res.send({
        status: ResponseStatus.Ok,
      });
    } catch (error: unknown) {
      if (error instanceof pgPromise.errors.QueryResultError) {
        if (!error.code) {
          res.send({
            status: ResponseStatus.Error,
            message: "Could not find file",
          });
        }
        res.send(ResponseStatus.Error);
        res.status(500);
        console.error(`Failed to delete file:\n${error}`);
        return;
      }
      console.error(error);
    }
  });
