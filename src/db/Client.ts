import {Client} from "@notionhq/client";
import * as process from "process";


const notionApiKey = process.env.NOTION_API_KEY

export const notion = new Client({ auth: notionApiKey });
