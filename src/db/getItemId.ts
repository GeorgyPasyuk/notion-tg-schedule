import { notion } from "@db/Client";

export const writeIds = async (): Promise<{}> => {
  const object: {} = {};
  const database_id = process.env.DATABASE_ID;
  const data = await notion.databases.retrieve({ database_id: database_id });

  for (const key in data.properties) {
    object[key] = data.properties[key].id;
  }
  console.log(data)
  return object;
};


writeIds()