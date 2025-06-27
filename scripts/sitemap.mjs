import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import path from "path";
import { promises as fs } from "fs";
import { buildClient, LogLevel } from "@datocms/cma-client-node";

dotenv.config({ path: ".env.local" }); //SE USATE direnv non serve specificare il path
// dotenv.config();

//contiene le rotte e loro prefissi
const conf = JSON.parse(
  await fs.readFile(new URL("../src/data/config-data.json", import.meta.url))
);

const t = (section, locale) => {
  if (!section) return;
  if (locale === conf.defaultLocale) return section;
  const key = conf.translations[section];
  if (key?.[locale] && key?.[locale] != "") {
    return key?.[locale];
  } else {
    return section;
  }
};

const { models, locales, defaultLocale } = conf || {};

const API_KEY = process.env.DATO_API_KEY; //use your read api key variable name here
const ENV = process.env.DATO_ENV ?? "";
const FOLDER = path.resolve("./public");
let HOST = process.env.HOST || "";
const NEWLINE = "";

if (HOST[HOST.length - 1] === "/") {
  HOST = HOST.slice(0, -1);
}

async function generateRobots() {
  const start = Date.now();
  const data = `
# *
User-agent: *
Allow: /

# Host
Host: ${HOST}

# Sitemaps
Sitemap: ${HOST}/sitemap.xml`;
  await fs.writeFile(`${FOLDER}/robots.txt`, data.trim());
  const elapsed = (Date.now() - start) / 1000;
  console.log("DONE GENERATE ROBOTS in", elapsed);
}

async function getRecords(models) {
  console.log("MODELS", JSON.stringify(models, null, 2));

  let options = { apiToken: API_KEY, logLevel: LogLevel.BASIC };
  if (ENV) {
    options.environment = ENV;
  }

  let client = await buildClient(options);
  // console.log("CLIENT", client);
  const itemTypesMap = await (
    await client.itemTypes.list()
  ).reduce((itm, i) => {
    const { id, api_key } = i;
    itm[id] = api_key;
    return itm;
  }, {});
  // console.log("itemTypesMap", JSON.stringify(itemTypesMap, null, 2));

  let records = [];
  // TO GET ALL RECORDS INSTEAD OF SOME
  for await (const record of client.items.listPagedIterator({
    filter: {
      type: models,
      slugField: { exists: true },
    },
  })) {
    // console.log("raw record", record.id);
    const { id, title, slug, item_type, tags, tag } = record || {};
    const apiKey = itemTypesMap[item_type.id];
    let t = tags;
    if (tag) t = [tag];
    let item = { id, title, slug, apiKey, tags: t };
    if (slug) {
      records.push(item);
    }
  }
  return records;
}

function getPrefix(path, slug, locale) {
  let prefix = "";
  if (path.split("/").length > 1) {
    const arrayOfPath = path
      .split("/")
      .filter((p) => p && !p.includes("slug") && p != slug);

    if (arrayOfPath.length > 0) {
      prefix = "/" + arrayOfPath.map((p) => t(p, locale)).join("/");
    }
  }
  return prefix;
}

function resolvePath(record, locale, allRecords) {
  // console.log("record", record);
  console.log("models", models);
  const { slug, apiKey, tagRef } = record;
  const isDefautlLocale = locale === defaultLocale;
  const localePrefix = isDefautlLocale ? "" : `/${locale}`;
  let sl = slug;
  if (typeof slug != "string") {
    if (!slug[locale]) return null;
    sl = slug[locale];
  }

  let info = models.find(
    ({ routeInfo }) => routeInfo.model === apiKey && routeInfo.querySlug == sl
  );

  if (!info && apiKey == "tag") {
    info = models.find(
      ({ routeInfo }) =>
        routeInfo.model === apiKey && routeInfo.tagRef == tagRef
    );
  } else {
    info = models.find(({ routeInfo }) => routeInfo.model === apiKey);
  }

  if (sl == "home") sl = "";

  if (info?.path) {
    const prefix = getPrefix(info.path, sl, locale);
    return `${localePrefix}${prefix ? `${prefix}/` : ""}${sl}`;
  }
}

function getSlugs(records) {
  return records
    .map((r) => {
      return locales.reduce((acc, l) => {
        if (!["it", "en"].includes(l)) {
          console.warn(`⚠️ Invalid locale detected: ${l}`);
          return acc;
        }
        const result = resolvePath(r, l, records);
        return result ? [...acc, result] : acc;
      }, []);
    })
    .flat();
}

function getRoute(path) {
  return `
  <url>
    <loc>${HOST}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

function extractTags(records) {
  const recordTags = records.filter((r) => r.apiKey == "tag");
  const newRecords = records.filter((r) => r.apiKey != "tag");

  for (const r of recordTags) {
    let references = new Set();
    records.forEach((elem) => {
      if (r.id && elem.tags && elem.tags.includes(r.id)) {
        references.add(elem.apiKey);
      }
    });
    references.forEach((ref) =>
      newRecords.push({
        ...r,
        tagRef: ref,
      })
    );
  }
  return newRecords;
}

async function generateSitemap() {
  const start = Date.now();

  // qui ci vanno i nomi delle api key relativi ai modelli delle pagine tipo "about_page,article";
  const pageModels = [
    ...models.reduce((acc, i) => {
      const { model } = i.routeInfo || {};
      if (model && model != "none") {
        acc.add(model);
      }
      return acc;
    }, new Set()),
  ].join(",");

  const records = await getRecords(pageModels);
  const allRecords = extractTags(records);
  const slugs = getSlugs(allRecords);
  const sitemap = `
  <\?xml version="1.0" encoding="UTF-8"\?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${slugs
    .sort()
    .map((p) => getRoute(p))
    .join(NEWLINE)}
  </urlset>`;
  await fs.writeFile(`${FOLDER}/sitemap.xml`, sitemap.trim());
  const elapsed = (Date.now() - start) / 1000;
  console.log("DONE GENERATE SITEMAP in", elapsed);
}

(() => {
  return Promise.all([generateRobots(), generateSitemap()]);
})();
