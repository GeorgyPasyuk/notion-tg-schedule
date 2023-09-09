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
exports.parseICalData = void 0;
// @ts-ignore
const ical_js_1 = __importDefault(require("ical.js"));
const parseICalData = (iCalData) => __awaiter(void 0, void 0, void 0, function* () {
    const jcalData = ical_js_1.default.parse(iCalData);
    const comp = new ical_js_1.default.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");
    const events = [];
    vevents.forEach((vevent) => {
        const dtstart = new Date(vevent.getFirstPropertyValue("dtstart"));
        const dtend = new Date(vevent.getFirstPropertyValue("dtend"));
        const description = vevent.getFirstPropertyValue("description");
        const descriptionLines = description.split("\n");
        const name = descriptionLines[1] ? descriptionLines[1].trim() : "";
        const eventTypeMatch = description.match(/Лекции|Практические \(семинарские\) занятия/i);
        const eventType = eventTypeMatch ? eventTypeMatch[0] : "";
        let color = eventType === "Лекции" ? "blue_background" : "red_background";
        if (eventType === "") {
            color = "yellow_background";
        }
        const eventObj = {
            dtstart: dtstart.toISOString(),
            dtend: dtend.toISOString(),
            uid: vevent.getFirstPropertyValue("uid"),
            summary: vevent.getFirstPropertyValue("summary"),
            location: vevent.getFirstPropertyValue("location"),
            description: description.replace(/DESCRIPTION:(.*?)\n/, ""),
            name: name,
            eventType: eventType,
            color: color,
        };
        events.push(eventObj);
    });
    return events;
});
exports.parseICalData = parseICalData;
