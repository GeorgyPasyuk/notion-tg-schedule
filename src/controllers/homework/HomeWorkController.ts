import { notion } from "@db/Client";
import { SortResponse } from "@utils/SortResponse";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDatabaseResponse,
  UpdatePageResponse
} from "@notionhq/client/build/src/api-endpoints";

const sortResponse = new SortResponse()


export class HomeWorkController{


  public async writeHomework(homework: string, page:  QueryDatabaseResponse){
    const pageId: string = sortResponse.getPageId(page);

    const args = {
      page_id: pageId,
      properties: {
        'Домашнее задание': {
          rich_text: [
            {
              text: {
                content: homework,
              },
            },
          ],
        },
      },
    }


    const response: UpdatePageResponse = await notion.pages.update(args);

    return response
  }


}