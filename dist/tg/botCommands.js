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
exports.connectCommands = void 0;
const getDb_1 = require("../controllers/getDb");
const tgInit_1 = require("./tgInit");
const controller = new getDb_1.dbController();
const connectCommands = () => {
    tgInit_1.bot.on("text", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (msg.text == "/day") {
                const result = yield controller.getNextDay();
                yield tgInit_1.bot.sendMessage(msg.chat.id, `${result}`);
            }
            else if (msg.text == "/week") {
            }
            else {
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
};
exports.connectCommands = connectCommands;
