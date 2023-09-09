import process from "process";
import { notion } from "@db/Client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { SortResponse } from "@utils/SortResponse";

const sortResponse = new SortResponse();

export class SubjectsController {
  protected dataBaseId: string = process.env.DATABASE_ID;

  public async getSubjectDates(name: string): Promise<Date[]> {
    let filterOptions: any = {
      database_id: this.dataBaseId,
      filter: {
        property: "Name",
        rich_text: {
          equals: name,
        },
      },
    };

    if (name.startsWith("Ин. яз.")) {
      const formattedName = name.match(/\((.*?)\)/)[1];
      if (formattedName) {
        filterOptions = {
          database_id: this.dataBaseId,
          filter: {
            property: "Преподаватель",
            rich_text: {
              starts_with: formattedName,
            },
          },
        };
      }
    }


    const pages: QueryDatabaseResponse =
      await notion.databases.query(filterOptions);

    return sortResponse.sortByDate(pages);
  }
}
