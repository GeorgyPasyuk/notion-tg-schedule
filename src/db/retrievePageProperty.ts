import { writeIds } from "./getItemId";
import { notion } from "@db/Client";
import * as process from "process";
import {DatabaseObjectResponse} from "@notionhq/client/build/src/api-endpoints";

require("dotenv").config();

/*async function retrievePageProperty()  {
    const object: {} = await writeIds();
    const keys: string[] = Object.keys(object)
    const values: string[] = Object.values(object)

    const pageId = process.env.PAGE_ID;
    const propertyId =  values[1]
    const response = await notion.pages.properties.retrieve({ page_id: pageId, property_id: "title" });
    //@ts-ignore
    console.log(response)
}

retrievePageProperty()*/

// replace with your own database ID

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
