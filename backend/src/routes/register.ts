import { db } from '@backend/database';
import { encrypt } from '@backend/utils/crypto';
import { ApiMessage, RegisterParams, RegisterResponse } from '@shared/api';
import { AccessKeyT, UserT } from '@shared/schema';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { postRoute } from '.';
import { JWT_SECRET } from '..';

export function registerRoute() {
  postRoute<RegisterResponse, RegisterParams>('/register', async (req, res) => {
    const { username, password, accessKey } = req.body;

    if (!username || !password) {
      return res.json({ message: ApiMessage.MissingFields });
    }

    const accessKeyRow = await db.oneOrNone<AccessKeyT>(
      'SELECT * FROM access_keys WHERE access_key = $1',
      [accessKey]
    );

    if (!accessKeyRow) {
      return res.json({ message: ApiMessage.InvalidAccessKey });
    }

    const user = await db.oneOrNone<UserT>(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (user) {
      return res.json({ message: ApiMessage.UserAlreadyExists });
    }

    const { encryptedData: encryptedPassword } = encrypt(password);
    const createdUser = await db.one<UserT>(
      `INSERT INTO users (user_id, username, password)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [uuid(), username, encryptedPassword]
    );
    const payload = { id: createdUser.userId };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30 days' });

    // Update access key use count
    await db.query(
      `UPDATE access_keys
      SET use_count = use_count + 1
      WHERE access_key = $2`,
      [accessKeyRow.useCount + 1, accessKey]
    );

    res.send({
      message: ApiMessage.Ok,
      user: createdUser,
      token: `Bearer ${token}`,
    });
  });
}
