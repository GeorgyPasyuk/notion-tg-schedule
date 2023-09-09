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
exports.retrieveDb = void 0;
const Client_1 = require("./Client");
require("dotenv").config();
const retrieveDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const database_id = process.env.DATABASE_ID;
    const data = yield Client_1.notion.databases.retrieve({ database_id: database_id });
    return {
        data: data,
        properties: data.properties
    };
});
exports.retrieveDb = retrieveDb;
