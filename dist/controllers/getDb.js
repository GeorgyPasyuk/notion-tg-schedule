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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbController = void 0;
const process_1 = __importDefault(require("process"));
const Client_1 = require("@db/Client");
class dbController {
    constructor() {
        this.dataBaseId = process_1.default.env.DATABASE_ID;
    }
    getNextDay() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const response = yield Client_1.notion.databases.query({
                database_id: this.dataBaseId,
                filter: {
                    property: "Date",
                    type: "date",
                    date: {
                        after: today.toISOString()
                    },
                },
            });
            return response;
        });
    }
}
exports.dbController = dbController;
/*const sortedRows = async () => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Name",
      type: "rich_text",
      rich_text: {
        does_not_equal: "",
      },
    },
  });

  //ts-ignore
  response.results.forEach((item: DatabaseObjectResponse) => {
    console.log(item.properties);
  });
};*/
