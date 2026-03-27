import { MetadataRoute } from "next";
import resolveLink from "@/lib/resolveLink";
import config from "@/data/config";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

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

// Modelli dinamici con slug — nome query GraphQL + apiKey per resolveLink
const DYNAMIC_MODELS: Array<{
  allQuery: string;
  countQuery: string;
  apiKey: string;
}> = [
  { allQuery: "allPhotos", countQuery: "_allPhotosMeta", apiKey: "photo" },
  { allQuery: "allPages", countQuery: "_allPagesMeta", apiKey: "page" },
  { allQuery: "allLocations", countQuery: "_allLocationsMeta", apiKey: "location" },
  { allQuery: "allCities", countQuery: "_allCitiesMeta", apiKey: "city" },
  { allQuery: "allAuthors", countQuery: "_allAuthorsMeta", apiKey: "author" },
  { allQuery: "allArchitectonicStyles", countQuery: "_allArchitectonicStylesMeta", apiKey: "architectonic_style" },
  { allQuery: "allArchitectonicElements", countQuery: "_allArchitectonicElementsMeta", apiKey: "architectonic_element" },
  { allQuery: "allPhotosCollections", countQuery: "_allPhotosCollectionsMeta", apiKey: "photos_collection" },
  { allQuery: "allVideos", countQuery: "_allVideosMeta", apiKey: "video" },
  { allQuery: "allExpositions", countQuery: "_allExpositionsMeta", apiKey: "exposition" },
  { allQuery: "allArticles", countQuery: "_allArticlesMeta", apiKey: "article" },
  { allQuery: "allBuildingCategories", countQuery: "_allBuildingCategoriesMeta", apiKey: "building_category" },
];

const PAGE_SIZE = 100;

type SlugLocale = { locale: string; value: string };

interface DatoRecord {
  _updatedAt: string;
  _allSlugLocales: SlugLocale[];
}

async function datoFetch(query: string): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
    "X-Exclude-Invalid": "true",
  };
  if (ENV) headers["X-Environment"] = ENV;

  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const json = await res.json();
  if (json.errors) {
    console.error("Sitemap DatoCMS error:", JSON.stringify(json.errors));
  }
  return json.data || {};
}

async function fetchAllRecords(model: (typeof DYNAMIC_MODELS)[number]): Promise<DatoRecord[]> {
  // Prima ottieni il conteggio totale
  const countData = await datoFetch(`{ ${model.countQuery} { count } }`);
  const total = countData?.[model.countQuery]?.count || 0;
  if (total === 0) return [];

  const allRecords: DatoRecord[] = [];

  for (let skip = 0; skip < total; skip += PAGE_SIZE) {
    const query = `{
      ${model.allQuery}(first: ${PAGE_SIZE}, skip: ${skip}) {
        _updatedAt
        _allSlugLocales { locale value }
      }
    }`;
    const data = await datoFetch(query);
    const records = data?.[model.allQuery] || [];
    allRecords.push(...records);
  }

  return allRecords;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { locales, defaultLocale } = config;
  const entries: MetadataRoute.Sitemap = [];

  // Pagine indice statiche
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

  // Pagine dinamiche da DatoCMS via GraphQL CDA
  const allResults = await Promise.all(
    DYNAMIC_MODELS.map(async (model) => {
      const records = await fetchAllRecords(model);
      return records.map((r) => ({ ...r, apiKey: model.apiKey }));
    })
  );

  for (const records of allResults) {
    for (const record of records) {
      for (const locale of locales) {
        const slug = record._allSlugLocales?.find(
          (s) => s.locale === locale
        )?.value;

        if (!slug) continue;

        const path = resolveLink({
          _modelApiKey: record.apiKey,
          locale: locale as any,
          slug,
        });

        // Salta homepage duplicata
        if (slug === "home" && locale !== defaultLocale && path === "/")
          continue;

        entries.push({
          url: `${HOST}${path}`,
          lastModified: record._updatedAt,
          changeFrequency: record.apiKey === "photo" ? "monthly" : "weekly",
          priority: record.apiKey === "page" ? 1.0 : 0.7,
        });
      }
    }
  }

  return entries;
}
