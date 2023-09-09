import { bot } from "./tgInit";
import { startMarkup } from "./markUp";


export const connectCommands = () => {
  bot.on("text", async (msg) => {
    try {
      if (msg.text == "/start") {
        await bot.sendMessage(
          msg.chat.id,
          "Привет, хочешь получить расписание или записать домашнее задание?",
          startMarkup,
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  });
};
