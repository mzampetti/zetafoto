import { getCollections } from "../../../scripts/utils";
import { MetadataRoute } from "next";
import { getQuery } from "./queries";
import routes from "@/data/routes.json";

type Slug = {
  slug: string;
};

type Item = {
  slug: string;
  techniques: Slug[];
  category: Slug;
};

let metadata = {
  lastModified: new Date(),
  changeFrequency: "monthly",
};

const siteUrl = process.env.HOST;

async function generateRoutes(query: string, locale: string, key: string) {
  return await getCollections(query, { locale }, key, 500);
}

function replaceSlug(template: string, slug: string): string {
  return template.replace("[slug]", slug);
}

export async function getDynamicsRoute(
  route: string
): Promise<MetadataRoute.Sitemap> {
  const slugs = [];
  const elements = route.split("/");
  const locale = elements[0];
  const key = routes[route];
  const query = getQuery(key);
  const data = await generateRoutes(query, locale, key);
  const isDefaultLocale = locale === "it";
  for (let d of data) {
    const { slug } = d;
    const path = replaceSlug(route, slug);
    const cleanPath = isDefaultLocale ? path.replace(/^it\//, "") : path;

    slugs.push({
      ...metadata,
      url: `${siteUrl}/${cleanPath}`,
    });
  }
  return slugs;
}
