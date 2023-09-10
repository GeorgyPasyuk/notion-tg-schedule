import { ScheduleController } from "@controllers/ScheduleController";
import { scheduleMarkup, subjectsMarkup } from "@tg/markUp";
import { bot } from "@tg/tgInit";

const messagesController = new ScheduleController();

export const byDayScheduleQuery = () => {
  let chat_id: number;

  bot.on("callback_query", async (ctx) => {
    chat_id = ctx.message.chat.id;
    try {
      switch (ctx.data) {
        case "schedule":
          await bot.sendMessage(
            ctx.message.chat.id,
            "Расписание на",
            scheduleMarkup,
          );
          break;
        case "today":
          await messagesController.getTodaySchedule(chat_id);
          break;
        case "next-day":
          await messagesController.getTomorrowSchedule(chat_id);
          break;
        case "subject":
          await bot.sendMessage(
            ctx.message.chat.id,
            "Выберите интересующий вас предмет",
            subjectsMarkup,
          );
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
