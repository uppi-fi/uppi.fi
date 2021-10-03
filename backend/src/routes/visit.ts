import { Application } from 'express';
import { db } from '../database';

export const visitRoute = (app: Application) =>
  app.get('/visit', async (req, res) => {
    const row = await db.one<{
      pageLoads: number;
    }>(
      'UPDATE site_statistics SET page_loads = page_loads + 1 RETURNING page_loads'
    );
    res.json(row.pageLoads);
  });
