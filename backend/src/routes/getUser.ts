import { UserIdParams, UserResponse } from '@shared/api';
import { getRoute } from '.';
import { db } from '../database';

export const getUserRoute = () =>
  getRoute<UserResponse, UserIdParams>('/get-user', async (req, res) => {
    const [user] = await db.any('SELECT * FROM users WHERE user_id = $1', [
      req.query.userId,
    ]);

    if (user) {
      return res.json(user);
    }

    res.json(null);
  });
