import { notion } from '@db/Client'
import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { SortResponse } from '@utils/SortResponse'
import fs from "fs";


const sortResponse = new SortResponse()
const filePath = `src/shared/DatabaseID.txt`



export class SubjectsApi {
  protected dataBaseId: string = fs.readFileSync(filePath, 'utf8')

  public async getSubjectDates(name: string): Promise<Date[]> {
    let filterOptions: QueryDatabaseParameters = {
      database_id: this.dataBaseId,
      filter: {
        property: 'Name',
        rich_text: {
          equals: name,
        },
      },
    }

    if (name.startsWith('Ин. яз.')) {
      const formattedName = name.match(/\((.*?)\)/)[1]
      if (formattedName) {
        filterOptions = {
          database_id: this.dataBaseId,
          filter: {
            property: 'Преподаватель',
            rich_text: {
              starts_with: formattedName,
            },
          },
        }
      }
    }

    const pages: QueryDatabaseResponse =
      await notion.databases.query(filterOptions)

    return sortResponse.sortByDate(pages)
  }
}
