require("dotenv").config();

import { notion } from "./Client";

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
      Тип: {
        rich_text: {},
      },
      date: {
        type: "date",
        date: {},
      },
    },
  });

  // const url = dataBase.url
  // const id = url.substring(url.lastIndexOf("/") + 1);
  // if you want to get access to id, be careful it is a weak spot

  console.log(dataBase);
};

initDB();
