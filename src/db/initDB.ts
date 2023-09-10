import dotenv from 'dotenv'

import { notion } from "./Client";

dotenv.config()

const initDB = async () => {
  const pageId = process.env.PAGE_ID;

  const dataBase = await notion.databases.create({
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
      "Домашнее задание": {
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


  //@ts-ignore
  const url = dataBase.url
  const id = url.substring(url.lastIndexOf("/") + 1);

  console.log(id);
};

initDB();