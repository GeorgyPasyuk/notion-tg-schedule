import { notion } from "@db/Client";
import {
  QueryDatabaseResponse,
  UpdatePageResponse
} from "@notionhq/client/build/src/api-endpoints";
import { SortResponse } from "@utils/SortResponse";

const sortResponse = new SortResponse()


export class HomeWorkApi {


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