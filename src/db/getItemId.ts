import { notion } from '@db/Client'
import fs from "fs";


const filePath = `src/shared/DatabaseID.txt`



export const writeIds = async (): Promise<{}> => {
  const object: {} = {}
  const DatabaseID = fs.readFileSync(filePath, 'utf8')
  const data = await notion.databases.retrieve({ database_id: DatabaseID })

  for (const key in data.properties) {
    object[key] = data.properties[key].id
  }
  return object
}


writeIds()