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
exports.getParsedData = void 0;
const icalPars_1 = require("./icalPars");
const fs = require("fs").promises;
const sharedFilePath = "./shared/";
const getParsedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const currentWeekStartDate = new Date(currentDate);
    currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const currentWeekEndDate = new Date(currentWeekStartDate);
    currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);
    const startDateFormatted = `${currentWeekStartDate.getFullYear()}.${(currentWeekStartDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${currentWeekStartDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    const endDateFormatted = `${currentWeekEndDate.getFullYear()}.${(currentWeekEndDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${currentWeekEndDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    const filePath = `${sharedFilePath}schedule_${startDateFormatted}_${endDateFormatted}.ics`;
    try {
        const data = yield fs.readFile(filePath, "utf8");
        return (0, icalPars_1.parseICalData)(data);
    }
    catch (err) {
        console.error("Error reading the file:", err);
        throw err;
    }
});
exports.getParsedData = getParsedData;
