import { MetadataRoute } from "next";
import { readFileSync } from "fs";
import { getDynamicsRoute } from "@/lib/sitemapUtils";
import routes from "@/data/routes.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.HOST;

  let sitemap: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];

  for (let r of Object.keys(routes)) {
    if (r.includes("[slug]")) {
      const slugs: MetadataRoute.Sitemap = await getDynamicsRoute(r);
      sitemap.push(...slugs);
    } else {
      sitemap.push({
        url: `${siteUrl}/${r}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
      });
    }
  }

  return sitemap;
}
