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
require("dotenv").config();
const Client_1 = require("./Client");
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const pageId = process.env.PAGE_ID;
    const dataBase = yield Client_1.notion.databases.create({
        parent: {
            type: "page_id",
            page_id: pageId,
        },
        icon: {
            type: "emoji",
            emoji: "📝",
        },
        cover: {
            type: "external",
            external: {
                url: "https://website.domain/images/image.png",
            },
        },
        title: [
            {
                type: "text",
                text: {
                    content: "Расписание",
                    link: null,
                },
            },
        ],
        properties: {
            Name: {
                title: {},
            },
            Кабинет: {
                rich_text: {},
            },
            Преподаватель: {
                rich_text: {},
            },
            Тип: {
                rich_text: {},
            },
            date: {
                type: "date",
                date: {},
            },
        },
    });
    // const url = dataBase.url
    // const id = url.substring(url.lastIndexOf("/") + 1);
    // if you want to get access to id, be careful it is a weak spot
    console.log(dataBase);
});
initDB();
