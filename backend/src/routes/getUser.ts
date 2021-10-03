import { UserT } from '@shared/schema';
import { Application } from 'express';
import { db } from '../database';

export const getUserRoute = (app: Application) =>
  app.get<
    unknown,
    UserT | null,
    unknown,
    {
      userId: string;
    }
  >('/get-user', async (req, res) => {
    const [user] = await db.any('SELECT * FROM users WHERE user_id = $1', [
      req.query.userId,
    ]);

    if (user) {
      return res.json(user);
    }

    res.json(null);
  });
