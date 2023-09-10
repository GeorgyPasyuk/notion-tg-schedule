import { notion } from "@db/Client";
import {DatabaseObjectResponse} from "@notionhq/client/build/src/api-endpoints";
import dotenv from 'dotenv'
import * as process from "process";

dotenv.config()



const sortedRows = async () => {
  const databaseId = process.env.DATABASE_ID;
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

  response.results.forEach((item: DatabaseObjectResponse) => {
    console.log(item.properties);
  });
};

sortedRows();
