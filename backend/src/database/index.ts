import { env } from '@shared/config';
import * as PgPromise from 'pg-promise';

function camelizeColumns(data: Record<string, string>[]) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

const pgp = PgPromise({
  receive: (data) => {
    camelizeColumns(data);
  },
});

export const db = pgp({
  connectionString: env.DATABASE_URL,
});
