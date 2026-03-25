import { MetadataRoute } from "next";

const HOST = process.env.HOST || "https://www.francozampetti.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/server",
    },
    host: HOST,
    sitemap: `${HOST}/sitemap.xml`,
  };
}
