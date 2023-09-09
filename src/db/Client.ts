import {Client} from "@notionhq/client";

require("dotenv").config();


export const notion = new Client({ auth: process.env.NOTION_API_KEY });
