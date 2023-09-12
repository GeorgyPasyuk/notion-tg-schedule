import { notion } from './Client'
import fs from "fs";
const filePath = `src/shared/DatabaseID.txt`

export const retrieveDb = async () => {
  const DatabaseID = fs.readFileSync(filePath, 'utf8')
  const data = await notion.databases.retrieve({ database_id: DatabaseID })
  return {
    data: data,
    properties: data.properties,
  }
}

