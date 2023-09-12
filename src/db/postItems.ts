import { getParsedData } from '@parse/getParsedData'

import { notion } from './Client'
import fs from "fs";


async function addToDatabase(databaseId: string, obj: any) {
  const { dtend, dtstart, location, summary, name, color, eventType } = obj
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
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
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: location,
              },
            },
          ],
        },
        Преподаватель: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        Тип: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
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
          type: 'date',
          date: {
            start: dtstart,
            end: dtend,
          },
        },
      },
    })
    console.log(response)
  } catch (error) {
    console.error(error.body)
  }
}

export async function updateData() {
  const obj = await getParsedData()
  const filePath = `src/shared/DatabaseID.txt`

  const DatabaseID = fs.readFileSync(filePath, 'utf8')

  obj.forEach((item: object) => {
    addToDatabase(DatabaseID, item)
  })
}

updateData()
