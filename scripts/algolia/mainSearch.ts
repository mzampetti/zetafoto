import { sendIndex } from "./algolia-utils";

function collectSerial(item: any) {
  const serial = item.serial || "";
  const variants = item.variantContainer.map(
    ({ code }: { code: string }) => code
  );
  return [serial, ...variants].join(" ");
}

function prepareData(obj: any) {
  let data: any = [];

  for (const item of obj) {
    let serial = "";
    if (item._modelApiKey == "product") {
      serial = collectSerial(item);
    }
    data.push({ ...item, objectID: item.id, serial });
  }

  return data;
}

export default async function search(
  locale: string,
  algoliaData: any,
  currentIndex: string
) {
  let data = prepareData(algoliaData);

  const indexName = `${currentIndex}_${locale}`;
  const searchableAttributes: string[] = [
    "name",
    "slug",
    "description",
    "serial",
  ];
  const attributesForFaceting: any = [];
  const customRanking: string[] = [];

  try {
    const indexData = {
      indexName,
      data,
      searchableAttributes,
      attributesForFaceting,
      indexLanguages: [locale],
      customRanking,
      hitsPerPage: 12,
    };

    const send = await sendIndex(indexData as any);
    console.log("SEND:: ", send);
    return send;
  } catch (error) {
    // console.log("THIS IS AN ERROR MESSAGE:: ", error.message);
    // console.error(error);
    throw new Error(error.message);
  }
}
