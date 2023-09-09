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
const getParsedData_1 = require("../parse/getParsedData");
require("dotenv").config();
const Client_1 = require("./Client");
const dataBaseId = process.env.DATABASE_ID;
function addToDatabase(databaseId, obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dtend, dtstart, location, summary, name, color, eventType } = obj;
        try {
            const response = yield Client_1.notion.pages.create({
                parent: {
                    database_id: databaseId,
                },
                properties: {
                    Name: {
                        type: "title",
                        title: [
                            {
                                type: "text",
                                text: {
                                    content: summary,
                                },
                                annotations: {
                                    color: color,
                                },
                            },
                        ],
                    },
                    Кабинет: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: location,
                                },
                            },
                        ],
                    },
                    Преподаватель: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: name,
                                },
                            },
                        ],
                    },
                    Тип: {
                        type: "rich_text",
                        rich_text: [
                            {
                                type: "text",
                                text: {
                                    content: eventType,
                                },
                                annotations: {
                                    color: color,
                                },
                            },
                        ],
                    },
                    date: {
                        type: "date",
                        date: {
                            start: dtstart,
                            end: dtend,
                        },
                    },
                },
            });
            console.log(response);
        }
        catch (error) {
            console.error(error.body);
        }
    });
}
function updateData() {
    return __awaiter(this, void 0, void 0, function* () {
        const obj = yield (0, getParsedData_1.getParsedData)();
        obj.forEach((item) => {
            addToDatabase(dataBaseId, item);
        });
    });
}
updateData();
