import { db } from '@backend/database';
import {
  ApiMessage,
  RegisterResponse,
  UsernameAndPasswordParams,
} from '@shared/api';
import { UserT } from '@shared/schema';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { postRoute } from '.';
import { JWT_SECRET } from '..';

export function registerRoute() {
  postRoute<RegisterResponse, UsernameAndPasswordParams>(
    '/register',
    async (req, res) => {
      const { username, password } = req.body;

      if (!username || !password) {
        console.log({ username, password });
        return res.json({ message: ApiMessage.MissingFields });
      }

      const user = await db.oneOrNone<UserT>(
        'SELECT * FROM users WHERE username = $1',
        [req.body.username]
      );

      if (user) {
        return res.json({ message: ApiMessage.UserExists });
      }

      const createdUser = await db.one<UserT>(
        `INSERT INTO users (user_id, username, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [uuid(), username, password]
      );
      const payload = { id: createdUser.userId };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30 days' });
      console.log({ token });
      res.send({
        message: ApiMessage.Ok,
        user: createdUser,
        token,
      });
    }
  );
}
