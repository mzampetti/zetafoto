import dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";
import search from "./mainSearch";
import algoliaData from "../../src/data/algoliaTempData/algoliaData.json";

dotenv.config({ path: ".env.local" });

export const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.ALGOLIA_WRITE_KEY || ""
);

const getDataFromCache = (locale: string, currentIndex: string) =>
  algoliaData[locale][currentIndex];

/**
 * List all current index
 */
export const listIndexes = async () => {
  const list = await client.listIndices();
  return list?.items?.map((i) => i.name);
};

/**
 * Function to create or update an Index with data on Algolia
 * @param {String} indexName - The name of the index
 * @param {Object} settings - settings regarding searching the index
 * @param {Array} data - the array of porperties to upload on the index
 * @param {Boolean} replace - whether to replace or create the current index data
 */
export const createObjects = async (
  indexName: string,
  settings: any,
  data: any[]
  // replace: boolean = false
) => {
  const indexes = await listIndexes();

  await client.setSettings({
    indexName,
    indexSettings: settings,
  });

  try {
    await client.saveObjects(
      {
        indexName,
        objects: data,
      },
      {
        timeouts: {
          write: 50000,
        },
      }
    );
    // if (indexes.includes(indexName)) {
    //   console.log("REPLACE ---", indexName);
    //   await client.replaceAllObjects(
    //     { indexName, objects: data },
    //     {
    //       timeouts: {
    //         write: 50000,
    //       },
    //     }
    //   );
    // } else {
    //   console.log("CREATE ---", indexName);
    //   await client.saveObjects(
    //     {
    //       indexName,
    //       objects: data,
    //     },
    //     {
    //       timeouts: {
    //         write: 50000,
    //       },
    //     }
    //   );
    // }
    return "Ok";
  } catch (err) {
    console.error("ERR: ", err);
    throw new Error(err);
  }
};

type SendIndexProps = {
  data: any;
  indexName: string;
  searchableAttributes: string[];
  attributesForFaceting: string[];
  indexLanguages: string[];
  customRanking?: string[] | undefined;
  hitsPerPage?: number | undefined;
  replace?: boolean | undefined;
  typoTolerance?: boolean | undefined;
};
export async function sendIndex({
  data = [],
  indexName,
  searchableAttributes = [],
  attributesForFaceting = [],
  indexLanguages,
  customRanking = [],
  hitsPerPage = 12,
}: SendIndexProps) {
  console.log("sending...");
  const settings = {
    hitsPerPage,
    customRanking,
    searchableAttributes,
    attributesForFaceting,
    indexLanguages,
    typoTolerance: "min",
  };
  console.info("INDEX", indexName, "DATA", data.length);
  try {
    await createObjects(indexName, settings, data);
    return "Ok";
  } catch (err) {
    throw new Error(err);
  }
}

// SYNC FUNCTION
export async function algoliaSync(locale: string, index: string) {
  // console.log("locale----------------------------", locale);
  // console.log("index----------------------------------------- ", index);
  const start = Date.now();
  try {
    const algoliaData = getDataFromCache(locale, index);
    if (!algoliaData) {
      throw new Error("No data cache!");
    }
    await search(locale, algoliaData, index);
    const elapsed = Date.now() - start;
    console.info("ELAPSED", elapsed / 1000, "seconds");
    return "updated";
  } catch (error) {
    throw new Error(error.message);
  }
}
