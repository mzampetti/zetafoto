import { NextRequest, NextResponse } from "next/server";
import { algoliaSync } from "../../../../../scripts/algolia/algolia-utils";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

export async function OPTIONS(request: NextRequest) {
  return new Response("ok", {
    status: 200,
    headers,
  });
}

export async function POST(request: NextRequest) {
  const locales = ["it", "en"];
  const { index } = await request.json();
  let res = "";
  for (const locale of locales) {
    console.log("LOCALE--------->>>>", locale);
    console.log("INDEX------------>>>>>", index);
    try {
      res = await algoliaSync(locale, index);
      console.log("res ----->", res);
    } catch (error) {
      return NextResponse.json({
        status: 500,
        body: { error: error.message },
      });
    }
  }
  return NextResponse.json({
    status: 200,
    body: { status: res },
  });
}
