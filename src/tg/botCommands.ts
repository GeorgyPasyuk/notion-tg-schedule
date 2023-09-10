import { ScheduleController } from "@controllers/ScheduleController";
import { helpText } from "@shared/tg/constants/helpText";

import { startMarkup } from "./markUp";
import { bot } from "./tgInit";

const messagesController = new ScheduleController();
export const connectCommands = () => {
  bot.on("text", async (msg) => {
    try {
      if (msg.text == "/start") {
        await bot.sendMessage(
          msg.chat.id,
          "Привет, хочешь получить расписание или записать домашнее задание?",
          startMarkup,
        );
      } else if (msg.text == "/today") {
        await messagesController.getTodaySchedule(msg.chat.id);
      } else if (msg.text == "/tomorrow") {
        await messagesController.getTomorrowSchedule(msg.chat.id);
      } else if (msg.text == "/help") {
        await bot.sendMessage(
          msg.chat.id,
          helpText,
          {
            parse_mode: "Markdown",
          },
        );
        await bot.sendMessage(msg.chat.id, "Приступим?", startMarkup)
      }
    } catch (error) {
      console.log(error);
    }
  });
};
