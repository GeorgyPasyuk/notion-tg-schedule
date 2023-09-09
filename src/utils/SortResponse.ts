import {
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDatabaseResponse, UpdatePageResponse
} from "@notionhq/client/build/src/api-endpoints";
import { formatMessagesDate } from "@utils/formatMessagesDate";
import { extractTimeInMinutes } from "@utils/extractTimeInMinutes";

export class SortResponse {
  private extractPageItem(properties: any) {
    const item: any = {};

    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        const property: any = properties[key];

        if (property.type === "rich_text" && property.rich_text.length > 0) {
          item[key] = property.rich_text[0].plain_text;
        }

        if (property.type === "date" && property.date) {
          item[key] = formatMessagesDate(property.date.start);
        }

        if (property.type === "title" && property.title.length > 0) {
          item[key] = property.title[0].plain_text;
        }
      }
    }

    return item;
  }

  public sortByDate(pages: QueryDatabaseResponse) {
    const dates: Date[] = pages.results
      .map((page: DatabaseObjectResponse) => {
        const dateProperty = page.properties["date"];
        if (dateProperty && dateProperty.type === "date") {
          return new Date(dateProperty.date.start);
        }
        return null;
      })
      .filter((date) => date !== null) as Date[];

    return dates.sort((a, b) => a.getTime() - b.getTime());
  }

  public getPageId(page: QueryDatabaseResponse) {
    const ids = page.results.map((page: DatabaseObjectResponse) => page.id);

    return ids[0];
  }

  public sortPages(pages: QueryDatabaseResponse) {
    const pageProperties = pages.results.map(
      (page: DatabaseObjectResponse) => page.properties
    );

    const resultArray = pageProperties.map((properties) =>
      this.extractPageItem(properties)
    );

    resultArray.sort((a, b) => {
      const timeA = extractTimeInMinutes(a["date"]);
      const timeB = extractTimeInMinutes(b["date"]);
      return timeA - timeB;
    });

    return {
      resultArray,
    };
  }

  public sortPage(page: PageObjectResponse | UpdatePageResponse) {

    if ('properties' in page) {
      const properties = page.properties;
      const item = this.extractPageItem(properties);

      const time = extractTimeInMinutes(item["date"]);
      return {
        ...item,
        time,
      };
    }

    return null; // или возврат другого значения по вашему выбору
  }

}
