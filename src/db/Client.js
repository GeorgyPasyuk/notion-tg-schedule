"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notion = void 0;
var client_1 = require("@notionhq/client");
require("dotenv").config();
exports.notion = new client_1.Client({ auth: process.env.NOTION_API_KEY });
