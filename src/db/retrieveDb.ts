import { notion } from "./Client";

require("dotenv").config();

export const retrieveDb = async ()=> {
  const database_id = process.env.DATABASE_ID;
  const data= await notion.databases.retrieve({ database_id: database_id });
  return data;
};

