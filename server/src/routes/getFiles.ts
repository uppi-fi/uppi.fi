import { Application } from "express";
import { db } from "../database";
import { FileT } from "../schema";
import { BaseResponse, ResponseStatus } from "../types";

export const getFilesRoute = (app: Application) =>
  app.get<FileT[], BaseResponse<FileT[]>>("/get-files", async (req, res) => {
    const files = await db.any<FileT>(`SELECT * FROM file`);
    res.json({
      status: ResponseStatus.Ok,
      data: files,
    });
  });
