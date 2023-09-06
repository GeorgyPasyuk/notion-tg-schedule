import {IIds} from "../shared/types/IIds";
import {writeIds} from "../shared/ids/ids";

require("dotenv").config();


async function retrievePageProperty()  {
    const object = await writeIds()
    const keys: string[] = Object.keys(object)
    const values: string[] = Object.values(object)

    const pageId = process.env.PAGE_ID;
    const propertyId =  values[1]
    //const response = await notion.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });
}

retrievePageProperty()