import { db } from '@backend/database';
import {
  ApiMessage,
  LoginResponse,
  UsernameAndPasswordParams,
} from '@shared/api';
import { UserT } from '@shared/schema';
import * as jwt from 'jsonwebtoken';
import { postRoute } from '.';
import { JWT_SECRET } from '..';

export function loginRoute() {
  postRoute<LoginResponse, UsernameAndPasswordParams>(
    '/login',
    async (req, res) => {
      const { username, password } = req.body;
      const user = await db.oneOrNone<UserT>(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );

      if (!user) {
        res.send({ message: ApiMessage.InvalidCredentials });
        return;
      }

      // TODO: Encryption
      if (user.password === req.body.password) {
        const payload = { id: user.userId };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30 days' });
        res.json({ message: ApiMessage.Ok, user, token: `Bearer ${token}` });
      } else {
        res.json({ message: ApiMessage.InvalidCredentials });
      }
    }
  );
}
