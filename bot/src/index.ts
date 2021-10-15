import { env } from '@shared/env';
import { UserT } from '@shared/schema';
import { Telegraf } from 'telegraf';
import { v4 as uuid } from 'uuid';
import { db } from '../../backend/src/database';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');
bot.launch();

bot.command('start', (ctx) => {
  ctx.reply('Moro, kerro tunnussana');
});

bot.hears(/^KAP$/, async (ctx) => {
  const telegramUserId = ctx.from.id;

  let [user] = await db.any<UserT>(
    'SELECT * FROM users WHERE telegram_user_id = $1',
    telegramUserId
  );

  if (!user) {
    const userId = uuid();

    // Create new
    user = await db.one(
      `INSERT INTO users (user_id, telegram_user_id)
      VALUES ($1, $2)
      ON CONFLICT (telegram_user_id)
      DO NOTHING
      RETURNING *`,
      [userId, telegramUserId]
    );
  }

  ctx.reply(
    `Tässä linkki tiedostoihisi:\n${`${env.frontendHost}/auth/${user.userId}`}`
  );
});

console.log('Bot started');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
