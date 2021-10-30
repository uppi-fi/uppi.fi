import { UserT } from '@shared/schema';
import { getRoute } from '.';
import { db } from '../database';

export const getUserRoute = () =>
  getRoute<
    UserT | null,
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
