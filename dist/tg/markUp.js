"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMarkUp = void 0;
const tgInit_1 = require("./tgInit");
const name = "name";
const connectMarkUp = () => {
    tgInit_1.bot.on("text", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg.text == "/menu") {
            yield tgInit_1.bot.sendMessage(msg.chat.id, `Выберите одно`, {
                reply_markup: {
                    keyboard: [
                        ["Расписание на следующий день"],
                        ["Расписание на следующую неделю"],
                        ["Предмет"],
                    ],
                },
            });
        }
    }));
    tgInit_1.bot.on("text", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        if (msg.text == "/start") {
            yield tgInit_1.bot.sendMessage(msg.chat.id, `Выберите одно`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Стикер", callback_data: "sticker" }],
                        [{ text: "Купить Файл", callback_data: "buyFile" }],
                        [{ text: "Проверить Подписку", callback_data: "checkSubs" }],
                        [{ text: "Закрыть Меню", callback_data: "closeMenu" }],
                    ],
                },
            });
        }
    }));
};
exports.connectMarkUp = connectMarkUp;
