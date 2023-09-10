import { subjectsMarkup } from "@tg/markUp";
import { bot } from "@tg/tgInit";

export const homeWorkQuery = () => {
  bot.on("callback_query", async (ctx) => {
    try {
      switch (ctx.data) {
        case "write-homework":
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
