import { HomeWorkController } from "@controllers/HomeWorkController";
import { ScheduleController } from "@controllers/ScheduleController";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { subjects } from "@shared/tg/constants/subjects";
import { bot } from "@tg/tgInit";
import { Message } from "node-telegram-bot-api";

const scheduleController = new ScheduleController();
const homeWorkController = new HomeWorkController();

let subject: string;
let page: QueryDatabaseResponse;

export const bySubjectScheduleQuery = () => {
  bot.on("callback_query", async (ctx) => {
    try {
      switch (true) {
        case ctx.data.startsWith("get-subject"):
          const parts = ctx.data.split("-");
          const index = parseInt(parts[2], 10);
          subject = subjects[index];
          await scheduleController.getSubjectDays(ctx.message.chat.id, subject);
          break;

        case ctx.data.startsWith("selected-date"):
          const date = ctx.data.match(/selected-date-(\d{2}.\d{2}.\d{4})/)[1];
          page = await scheduleController.getDaysSubject(
            ctx.message.chat.id,
            date,
            subject,
          );
          break;

        case ctx.data === "another-date":
          await bot.sendMessage(
            ctx.message.chat.id,
            `Выберите дату предмета ${subject}`,
            scheduleController.datesMarkup,
          );
          break;

        case ctx.data === "write-homework-by-subject":
          await bot.sendMessage(
            ctx.message.chat.id,
            "Пожалуйста отправьте домашнее задание",
          );

          const textHandler = async (msg: Message) => {
            await homeWorkController.writeHomeworkBySubject(
              ctx.message.chat.id,
              msg.text,
              page,
            );
            bot.removeListener("text", textHandler);
          };
          bot.on("text", textHandler);

          break;
      }
    } catch (error) {
      console.log(error);
    }
  });
};
