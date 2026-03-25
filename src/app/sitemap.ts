import { MetadataRoute } from "next";
import { buildClient } from "@datocms/cma-client-node";
import resolveLink from "@/lib/resolveLink";
import config from "@/data/config";

const HOST = process.env.HOST || "https://www.francozampetti.com";
const API_KEY = process.env.DATO_API_KEY!;
const ENV = process.env.DATO_ENV || "";

// Modelli DatoCMS con il loro _modelApiKey
const MODELS_TO_FETCH = [
  "page",
  "photo",
  "location",
  "city",
  "author",
  "architectonic_style",
  "architectonic_element",
  "photos_collection",
  "video",
  "exposition",
  "article",
  "building_category",
  "about_page",
  "category",
];

// Modelli index (pagine lista, senza slug dinamico)
const INDEX_MODELS = [
  "locations_index",
  "cities_index",
  "authors_index",
  "architectonic_styles_index",
  "architectonic_elements_index",
  "photos_collections_index",
  "videos_index",
  "expositions_index",
  "articles_index",
  "building_categories_index",
];

async function getRecords() {
  const options: any = { apiToken: API_KEY };
  if (ENV) options.environment = ENV;

  const client = buildClient(options);

  const itemTypesMap: Record<string, string> = {};
  for (const itemType of await client.itemTypes.list()) {
    itemTypesMap[itemType.id] = itemType.api_key;
  }

  const records: Array<{
    slug: any;
    apiKey: string;
    updatedAt: string;
  }> = [];

  for await (const record of client.items.listPagedIterator({
    filter: {
      type: MODELS_TO_FETCH.join(","),
      slugField: { exists: true },
    },
  })) {
    const apiKey = itemTypesMap[record.item_type.id];
    if (record.slug) {
      records.push({
        slug: record.slug,
        apiKey,
        updatedAt: record.meta.updated_at as string,
      });
    }
  }

  return records;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const records = await getRecords();
  const { locales, defaultLocale } = config;
  const entries: MetadataRoute.Sitemap = [];

  // Pagine indice statiche (per ogni locale)
  for (const model of INDEX_MODELS) {
    for (const locale of locales) {
      const path = resolveLink({
        _modelApiKey: model,
        locale: locale as any,
      });
      entries.push({
        url: `${HOST}${path}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Pagine dinamiche da DatoCMS
  for (const record of records) {
    for (const locale of locales) {
      const slug =
        typeof record.slug === "string"
          ? record.slug
          : record.slug[locale] || null;

      if (!slug) continue;

      const path = resolveLink({
        _modelApiKey: record.apiKey,
        locale: locale as any,
        slug,
      });

      // Salta homepage duplicata
      if (slug === "home" && locale !== defaultLocale && path === "/") continue;

      entries.push({
        url: `${HOST}${path}`,
        lastModified: record.updatedAt,
        changeFrequency: record.apiKey === "photo" ? "monthly" : "weekly",
        priority: record.apiKey === "page" ? 1.0 : 0.7,
      });
    }
  }

  return entries;
}
