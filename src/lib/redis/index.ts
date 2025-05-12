import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

type cachedApp = {
  url?: string;
  ts?: number;
  err?: any;
};

function validateAndFixUrl(url: string) {
  if (typeof url !== "string" || url.trim() === "") {
    throw new Error("Inserisci una URL valida.");
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  const urlParts = url.split("://");
  const protocol = urlParts[0];
  const rest = urlParts[1].replace(/\/\/+/g, "/");

  return `${protocol}://${rest}`;
}

export async function setRedisKV(HOST: string, params?: any) {
  const { locale } = params || {};
  let SITE_KEY = process.env.SITE_KEY || HOST;
  if (locale) {
    SITE_KEY = SITE_KEY + "_" + locale;
  }
  const ALGOLIA_ENDPOINT = process.env.ALGOLIA_API_ENDPOINT || "/api/algolia-sync";
  const url = validateAndFixUrl(HOST + ALGOLIA_ENDPOINT);
  const cachedApp: cachedApp = await redis.get(SITE_KEY);
  const value = {
    url,
    ts: Math.floor(Date.now() / 1000),
    ...(locale ? { body: { locale } } : {}),
  };

  if (!cachedApp || (cachedApp && cachedApp?.url != url)) {
    await redis.set(SITE_KEY, value);
  } else {
    return;
  }
}
