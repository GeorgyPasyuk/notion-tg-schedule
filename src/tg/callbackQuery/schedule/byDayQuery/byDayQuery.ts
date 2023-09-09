import { bot } from "@tg/tgInit";
import { scheduleMarkup, startMarkup, subjectsMarkup } from "@tg/markUp";
import { formatMessages } from "@utils/formatMessages";
import { ByDayController } from "@controllers/ByDayController";
import { getRussianDayOfWeek } from "@utils/getRussianDayOfWeek";
import { SortResponse } from "@utils/SortResponse";


const controller = new ByDayController();
const sortResponse = new SortResponse()


export const byDayQuery = () => {
  bot.on("callback_query", async (ctx) => {
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
          const todayResponse = await controller.getToday();
          
          const { resultArray: todayResultArray } = sortResponse.sortPages(todayResponse);
          
          await bot.sendMessage(
            ctx.message.chat.id,
            formatMessages(
              todayResultArray,
              getRussianDayOfWeek(new Date().toISOString()),
            ),
            startMarkup,
          );

          break;
        case "next-day":
          const nextDayResponse = await controller.getNextDay();

          const { resultArray: nextDayResultArray } = sortResponse.sortPages(nextDayResponse);

          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          await bot.sendMessage(
            ctx.message.chat.id,
            formatMessages(
              nextDayResultArray,
              getRussianDayOfWeek(tomorrow.toISOString()),
            ),
            startMarkup,
          );

          break;
        /*case "next-week":
          const weekResults = await controller.getNextWeek();
          const groupedWeekResults = groupByDayOfWeek(weekResults);
          const maxLength = 4096;

          for (const dayGroup of groupedWeekResults) {
            const dayOfWeek = dayGroup.dayOfWeek;
            const dayResults = dayGroup.objects;

            const dayMessage = formatWeekMsg(dayResults);
            const dayMessageParts = splitMessage(dayMessage, maxLength);

            for (const msg of dayMessageParts) {
              await bot.sendMessage(ctx.message.chat.id, msg, startMarkup);
            }
          }
          break;*/
        case "subject":
          await bot.sendMessage(ctx.message.chat.id, 'Выберите интересующий вас предмет', subjectsMarkup)
          break
        case "homework":
          await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
