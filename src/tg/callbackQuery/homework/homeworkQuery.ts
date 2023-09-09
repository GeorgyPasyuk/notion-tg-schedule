import { bot } from "@tg/tgInit";
import { scheduleMarkup, startMarkup, subjectsMarkup } from "@tg/markUp";
import { formatMessages } from "@utils/formatMessages";
import { ByDayController } from "@controllers/ByDayController";
import { getRussianDayOfWeek } from "@utils/getRussianDayOfWeek";
import { SortResponse } from "@utils/SortResponse";


const controller = new ByDayController();
const sortResponse = new SortResponse()


export const homeWorkQuery = () => {
  let pageId;


  bot.on("callback_query", async (ctx) => {
    try {
      switch (ctx.data) {
        case "write-homework":



          // await bot.sendMessage(
          //   ctx.message.chat.id,
          //   "Пожалуйста отправьте домашнее задание",
          // );



          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
