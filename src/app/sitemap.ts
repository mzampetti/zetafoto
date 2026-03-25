import { MetadataRoute } from "next";
import { buildClient } from "@datocms/cma-client-node";
import resolveLink from "@/lib/resolveLink";
import config from "@/data/config";

// Forza rendering dinamico (non pre-renderizzare a build time)
export const dynamic = "force-dynamic";
export const revalidate = 3600; // rigenera ogni ora

const HOST = process.env.HOST || "https://www.francozampetti.com";
const API_KEY = process.env.DATO_API_KEY!;
const ENV = process.env.DATO_ENV || "";

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

  // Recupera tutti i modelli e filtra solo quelli con slug field
  const allItemTypes = await client.itemTypes.list();
  const itemTypesMap: Record<string, string> = {};
  const modelsWithSlug: string[] = [];

  for (const itemType of allItemTypes) {
    itemTypesMap[itemType.id] = itemType.api_key;
    // Recupera i campi per verificare quali modelli hanno uno slug
    const fields = await client.fields.list(itemType.id);
    const hasSlug = fields.some(
      (f) => f.field_type === "slug" || f.api_key === "slug"
    );
    if (hasSlug) {
      modelsWithSlug.push(itemType.api_key);
    }
  }

  const records: Array<{
    slug: any;
    apiKey: string;
    updatedAt: string;
  }> = [];

  if (modelsWithSlug.length === 0) return records;

  for await (const record of client.items.listPagedIterator({
    filter: {
      type: modelsWithSlug.join(","),
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
