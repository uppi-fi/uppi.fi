import { Telegraf } from "telegraf";
import { v4 as uuid } from "uuid";
import { db } from "../database";
import { UserT } from "../schema";

const bot = new Telegraf("763739862:AAHPknItmC-_dw81cM8bZVMYSuAovTVx5bQ");
bot.launch();

bot.command("start", (ctx) => {
  ctx.reply(`Moro, kerro tunnussana`);
});

bot.hears(/^KAP$/, async (ctx) => {
  ctx.reply(`Nice 😏`);

  const telegramUserId = ctx.from.id;

  let [user] = await db.any<UserT>(
    "SELECT * FROM users WHERE telegram_user_id = $1",
    telegramUserId,
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
      [userId, telegramUserId],
    );
  }

  setTimeout(() => {
    ctx.reply(
      `Tässä linkki videoihisi: ${`http://109.204.224.208:3005/access/${user.userId}`}`,
    );
  }, 2000);
});

console.log("Bot started");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
