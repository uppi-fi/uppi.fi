import { env } from '@shared/config';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { db } from './database';
import { registerRoutes } from './routes';

dotenv.config();

export const JWT_SECRET = 'mysecretword';

export const authorization = passport.authenticate('jwt', { session: false });

const app = express();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
const strategy = new Strategy(opts, async (payload, done) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE user_id = $1', [
    payload.id,
  ]);
  if (user) {
    return done(null, {
      id: user.id,
      username: user.username,
    });
  }
  done(null, false);
});

app.use(passport.initialize());
passport.use(strategy);

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));
registerRoutes(app);

app.listen(env.BACKEND_PORT, () => {
  console.log(
    `Express server is running at http://localhost:${env.BACKEND_PORT}`
  );
});
