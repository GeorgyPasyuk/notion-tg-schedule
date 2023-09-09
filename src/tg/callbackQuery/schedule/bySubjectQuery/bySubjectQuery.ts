import { createDatesMarkup, byDateMarkup } from "@tg/markUp";
import { bot } from "@tg/tgInit";
import { subjects } from "@shared/tg/constants/subjects";
import { SubjectsController } from "@controllers/SubjectsController";
import { ByDayController } from "@controllers/ByDayController";
import { formatMessage, formatMessages } from "@utils/formatMessages";
import { SortResponse } from "@utils/SortResponse";
import { HomeWorkController } from "@controllers/homework/HomeWorkController";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const sortResponse = new SortResponse()

const subjectsController = new SubjectsController();
const byDayController = new ByDayController();
const homeworkController = new HomeWorkController()

export const bySubjectQuery = () => {
  let subject: string;
  let subjectMessage: number;
  let dateMessage: number;
  let chatId: number;
  let datesMarkup: any;
  let page: QueryDatabaseResponse;

  bot.on("callback_query", async (ctx) => {
    try {
      switch (true) {
        case ctx.data.startsWith("get-subject"):
          const parts = ctx.data.split("-");
          const index = parseInt(parts[2], 10);
          subject = subjects[index];

          const dates = await subjectsController.getSubjectDates(subject);

          datesMarkup = createDatesMarkup(dates);

          if (dates && dates.length > 0) {
            await bot.sendMessage(
              ctx.message.chat.id,
              `Выберите дату предмета ${subject}`,
              datesMarkup,
            );
            subjectMessage = ctx.message.message_id;
            chatId = ctx.message.chat.id;
          } else {
            await bot.sendMessage(
              ctx.message.chat.id,
              `По предмету '${subject}' нет доступных дат.`,
            );
          }
          break;
        case ctx.data.startsWith("selected-date"):
          const date = ctx.data.match(/selected-date-(\d{2}.\d{2}.\d{4})/)[1];
          dateMessage = ctx.message.message_id;
          if (date) {

            const byDateResponse = await byDayController.getSubjectByDate(date, subject);

            page = byDateResponse

            const {resultArray: dateResultArray} = sortResponse.sortPages(byDateResponse)


            const message = formatMessages(dateResultArray);
            if (message) {
              await bot.sendMessage(ctx.message.chat.id, message, byDateMarkup);
            }
          }
          break;
        case ctx.data === "another-date":
          await bot.sendMessage(
            ctx.message.chat.id,
            `Выберите дату предмета ${subject}`,
            datesMarkup,
          );
          break;


        case ctx.data === "write-homework-by-subject":
        await bot.sendMessage(
          ctx.message.chat.id,
          "Пожалуйста отправьте домашнее задание",
        );


        bot.on("text", async (msg) =>{

          const changedHomeworkResponse = await homeworkController.writeHomework(msg.text, page)



          const homeworkResultArray = sortResponse.sortPage(changedHomeworkResponse)

          await bot.sendMessage(ctx.message.chat.id,
            `Вы изменили домашнее задание на \n ${formatMessage(homeworkResultArray)}`,)


          if (chatId && subjectMessage && dateMessage) {
            await bot.deleteMessage(chatId, subjectMessage);
            await bot.deleteMessage(chatId, dateMessage);
          }
        })



        break

      }
    } catch (error) {
      console.log(error);
    }
  });
};
