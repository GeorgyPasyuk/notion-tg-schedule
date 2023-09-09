"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const commands_1 = require("./commands/commands");
const botCommands_1 = require("./botCommands");
const markUp_1 = require("./markUp");
require("dotenv").config();
const token = process.env.TG_TOKEN;
exports.bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.bot.setMyCommands(commands_1.commands);
exports.bot.on("text", (msg) => {
    exports.bot.sendMessage(msg.chat.id, "msg");
});
(0, botCommands_1.connectCommands)();
(0, markUp_1.connectMarkUp)();
