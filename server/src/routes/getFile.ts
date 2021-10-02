import { Application } from "express";
import { db } from "../database";
import { FileT } from "../schema";
import { BaseResponse, ResponseStatus } from "../types";

export const getFileRoute = (app: Application) =>
  app.get<
    {
      fileId: string;
    },
    BaseResponse<FileT>
  >("/get-file", async (req, res) => {
    const [file] = await db.any(`SELECT * FROM file WHERE id=$1`, [
      req.query.fileId,
    ]);

    if (file) {
      return res.json({
        status: ResponseStatus.Ok,
        data: file,
      });
    }

    res.json({
      status: ResponseStatus.Error,
      message: "Could not find file",
    });
  });
