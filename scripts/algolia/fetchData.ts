import fs from "fs";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: ".env.local" }); //SE USATE direnv non serve specificare il path
import { mainQuery } from "../../src/lib/algolia/query";
import { getCollections } from "../utils";
const locales = ["it", "en"];

async function fetchData() {
  let data = {};
  for (const locale of locales) {
    data[locale] = {};
    const queryIndexes = Object.keys(mainQuery);
    for (let currentIndex of queryIndexes) {
      const query = mainQuery[currentIndex];
      const results = await getCollections(query, { locale }, currentIndex);
      data[locale][currentIndex] = results;
    }
  }
  return data;
}

fetchData().then((data) => {
  console.info("SAVE DATA TO JSON");
  fs.writeFileSync(
    `src/data/algoliaTempData/algoliaData.json`,
    JSON.stringify(data, null, 2)
  );
});
