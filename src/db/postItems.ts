import {getParsedData} from "../parse/getParsedData";

require("dotenv").config();
import {notion} from "./Client";
const dataBaseId = process.env.DATABASE_ID;

async function addToDatabase(databaseId: string, obj: any) {
  const { dtend, dtstart, location, summary, name, color, eventType } = obj;
  try {
    const response = await notion.pages.create({
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
  } catch (error) {
    console.error(error.body);
  }
}

async function updateData() {
  const obj = await getParsedData();
  obj.forEach((item: object) => {
    addToDatabase(dataBaseId, item);
  });
}


updateData()