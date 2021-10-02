import { Application } from "express";
import { db } from "../database";
import { UserT } from "../schema";

export const getUserRoute = (app: Application) =>
  app.get<
    {},
    UserT | null,
    {},
    {
      userId: string;
    }
  >("/get-user", async (req, res) => {
    const [user] = await db.any(`SELECT * FROM users WHERE user_id = $1`, [
      req.query.userId,
    ]);

    if (user) {
      return res.json(user);
    }

    res.json(null);
  });
