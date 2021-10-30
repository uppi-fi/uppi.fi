import { db } from '@backend/database';
import { UserT } from '@shared/schema';
import * as jwt from 'jsonwebtoken';
import { postRoute } from '.';
import { JWT_SECRET } from '..';

const FAIL_MESSAGE = 'invalid credentials';

export function loginRoute() {
  postRoute<{}, { username: string; password: string }>(
    '/login',
    async (req, res) => {
      const { username, password } = req.body;
      const user = await db.oneOrNone<UserT>(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );

      if (!user) {
        res.send({ message: FAIL_MESSAGE });
        return;
      }

      // TODO: Encryption
      if (user.password === req.body.password) {
        const payload = { id: user.userId };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30 days' });
        res.json({ message: 'ok', user, token: `Bearer ${token}` });
      } else {
        res.json({ message: FAIL_MESSAGE });
      }
    }
  );
}
