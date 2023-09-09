import process from "process";
import { notion } from "@db/Client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetDateToISO } from "@utils/GetDateToISO";
import { SortResponse } from "@utils/SortResponse";

const getDay = new GetDateToISO();
const sortResponse = new SortResponse();
const getDayToISO = new GetDateToISO();

export class ByDayController {
  protected dataBaseId: string = process.env.DATABASE_ID;
  protected tomorrow: string;
  protected today: string;

  constructor() {
    this.today = getDay.getToday();
    this.tomorrow = getDay.getTomorrow();
  }

  public async getToday() {
    const todayResponse: QueryDatabaseResponse = await notion.databases.query({
      database_id: this.dataBaseId,
      filter: {
        property: "date",
        date: {
          equals: this.today,
        },
      },
    });

    return todayResponse;
  }

  public async getNextDay() {
    const nextDayResponse: QueryDatabaseResponse = await notion.databases.query({
      database_id: this.dataBaseId,
      filter: {
        property: "date",
        date: {
          equals: this.tomorrow,
        },
      },
    });

    return nextDayResponse;
  }

  public async getSubjectByDate(date: string, name: string) {
    const formattedDate = getDayToISO.getDate(date);

    let filterOptions: any = {
      database_id: this.dataBaseId,
      filter: {
        and: [
          {
            property: "date",
            date: {
              equals: formattedDate,
            },
          },
          {
            property: "Name",
            rich_text: {
              equals: name,
            },
          },
        ],
      },
    };

    if (name.startsWith("Ин. яз.")) {
      const formattedName = name.match(/\((.*?)\)/)[1];

      filterOptions = {
        database_id: this.dataBaseId,
        filter: {
          and: [
            {
              property: "date",
              date: {
                equals: formattedDate,
              },
            },
            {
              property: "Преподаватель",
              rich_text: {
                starts_with: formattedName,
              },
            },
          ],
        },
      };
    }

    const byDateResponse: QueryDatabaseResponse =
      await notion.databases.query(filterOptions);

    return byDateResponse;
  }

  /*
  public async getNextWeek() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const nextWeekStartDateString = today.toISOString().split("T")[0];
    const nextWeekEndDateString = nextWeek.toISOString().split("T")[0];

    const pages: QueryDatabaseResponse = await notion.databases.query({
      database_id: this.dataBaseId,
      filter: {
        property: "date",
        date: {
          on_or_after: nextWeekStartDateString,
          before: nextWeekEndDateString,
        },
      },
    });

    return formatData(pages);
  }
*/
}
