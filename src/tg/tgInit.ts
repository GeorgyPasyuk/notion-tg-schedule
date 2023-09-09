import TelegramBot from "node-telegram-bot-api";
import { connectCommands } from "./botCommands";
import { menuCommands } from "@shared/tg/constants/commands";
import { connectCallbackQueries } from "@tg/callbackQuery/schedule";
const { TG_TOKEN: token } = process.env;

export const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(menuCommands!);

connectCommands();

connectCallbackQueries();
