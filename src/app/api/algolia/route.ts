import { NextRequest, NextResponse } from "next/server";
import { setRedisKV } from "@/lib/redis";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

const HOST = process.env.HOST;
function isLocalhost(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname === "localhost";
}

export async function OPTIONS(request: NextRequest) {
  return new Response("ok", {
    status: 200,
    headers,
  });
}

export async function POST(request: NextRequest) {
  const indexes = ["product", "category", "technique"];
  let data = null;
  if (!isLocalhost(HOST)) await setRedisKV(HOST);
  for (const index of indexes) {
    const response = await fetch(`${HOST}/api/algolia/sync`, {
      method: "POST",
      body: JSON.stringify({ index }),
    });
    data = await response.json();
  }
  return NextResponse.json({
    status: data.status,
    body: data.body,
  });
}
