import { homeWorkQuery } from "@tg/callbackQuery/homework/homeworkQuery";
import { byDayScheduleQuery } from "@tg/callbackQuery/schedule/byDayScheduleQuery";
import { bySubjectScheduleQuery } from "@tg/callbackQuery/schedule/bySubjectScheduleQuery";
import { startMarkup } from "@tg/markUp";
import { bot } from "@tg/tgInit";

export const connectCallbackQueries = () => {
  bot.on("callback_query", async (ctx) => {
    switch (ctx.data) {
      case "start":
        await bot.sendMessage(
          ctx.message.chat.id,
          "Привет, хочешь получить расписание или записать домашнее задание?",
          startMarkup,
        );
        break;
    }
  });
  homeWorkQuery();
  bySubjectScheduleQuery();
  byDayScheduleQuery();
};
