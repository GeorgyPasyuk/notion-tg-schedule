import { menuCommands } from "@shared/tg/constants/commands";
import { connectCallbackQueries } from "@tg/callbackQuery/schedule";
import TelegramBot from "node-telegram-bot-api";

import { connectCommands } from "./botCommands";
import * as process from "process";

const token = process.env.TG_TOKEN

export const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands(menuCommands!);


connectCommands();

connectCallbackQueries();
