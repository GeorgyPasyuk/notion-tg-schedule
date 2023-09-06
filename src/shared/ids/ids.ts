import {retrieveDb} from "@db/retrieveDb";


export const writeIds = async () => {
  const data = await retrieveDb();
  const object: any = [];

  for (const key in data.properties) {
    object[key] = data.properties[key].id;
  }

  console.log(object)
  return object;
};

writeIds()