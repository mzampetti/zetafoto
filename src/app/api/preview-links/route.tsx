import { NextRequest } from "next/server";
import resolveLink from "@/lib/resolveLink";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

function generatePreviewUrl({ item, itemType, locale }: any) {
  console.info("locale", locale);

  if (!item?.attributes) return null;
  const _modelApiKey = itemType.attributes.api_key || "";

  console.info("_modelApiKey", _modelApiKey);
  const slug = item.attributes.slug || null;
  let slugs = Object.keys(slug).map((locale) => {
    return { locale, value: slug[locale] };
  });
  let record: any = { slugs, _modelApiKey };
  const link = resolveLink({ ...record, locale });

  console.info("LINK", link);
  return link;
}

export async function OPTIONS(request: NextRequest) {
  return new Response("ok", {
    status: 200,
    headers,
  });
}

export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  const body = await request.json();
  // console.log("body", body);
  const url = generatePreviewUrl(body);

  if (!url) {
    return new Response(JSON.stringify({ previewLinks: [] }), {
      status: 200,
      headers,
    });
  }

  const baseUrl = process.env.HOST || "";
  const previewLinks = [];

  previewLinks.push({
    label: "Published version",
    url: `${baseUrl}${url}`,
  });

  previewLinks.push({
    label: "Draft version",
    url: `${baseUrl}/api/preview?url=${url}`,
  });

  return new Response(JSON.stringify({ previewLinks }), {
    status: 200,
    headers,
  });
}
