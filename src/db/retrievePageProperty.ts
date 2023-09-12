import { notion } from '@db/Client'
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import fs from 'fs'

const filePath = `src/shared/DatabaseID.txt`

const sortedRows = async () => {
  const DatabaseID = fs.readFileSync(filePath, 'utf8')

  const response = await notion.databases.query({
    database_id: DatabaseID,
    filter: {
      property: 'Name',
      type: 'rich_text',
      rich_text: {
        does_not_equal: '',
      },
    },
  })

  response.results.forEach((item: DatabaseObjectResponse) => {
    console.log(item.properties)
  })
}

sortedRows()
