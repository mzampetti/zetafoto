// scripts/generate-search-index.ts
import { writeFile } from "fs/promises";
import { request } from "graphql-request";
import config from "../src/data/data-search.json";

const endpoint = "https://your-datocms-api-endpoint.com/";
const token = process.env.DATO_API_KEY!;

const headers = {
  Authorization: `Bearer ${token}`,
};

type Record = {
  id: string;
  model: string;
  locale: string;
  slug: string;
  title: string;
  url: string;
  content: string;
};

function generateQuery(model: string, fields: string[]) {
  return `${model} {
    id
    locale
    ${fields.join("\n")}
  }`;
}

async function fetchRecords(): Promise<Record[]> {
  const queries = config.models.map((model) =>
    generateQuery(model, config.fields[model])
  );

  const fullQuery = `query AllSearchData {
    ${queries.join("\n")}
  }`;

  const res = await request(endpoint, fullQuery, undefined, headers);
  const records: Record[] = [];

  for (const model of config.models) {
    const entries = res[model] ?? [];
    for (const entry of entries) {
      for (const locale of config.locales) {
        if (entry.locale !== locale) continue;

        const contentPieces = config.fields[model]
          .map((f) => entry[f] ?? "")
          .filter(Boolean);
        records.push({
          id: entry.id,
          model,
          locale,
          slug: entry.slug || "",
          title: entry.title || entry.name || "",
          url: `/${locale === config.defaultLocale ? "" : locale + "/"}${
            entry.slug
          }`,
          content: contentPieces.join(" ").toLowerCase(),
        });
      }
    }
  }

  return records;
}

(async () => {
  const records = await fetchRecords();
  await writeFile("public/search-index.json", JSON.stringify(records, null, 2));
  console.log(`✅ search-index.json created with ${records.length} records.`);
})();
