import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

export default async function fetchDato<
  TResult = unknown,
  TVariables = Record<string, any>
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  isDraft?: boolean
): Promise<TResult> {
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Exclude-Invalid": "true",
    Authorization: `Bearer ${process.env.DATO_API_KEY}`,
  };

  if (process.env.DATO_ENV) headers["X-Environment"] = process.env.DATO_ENV;
  if (isDraft) headers["X-Include- Drafts"] = "true";

  const query = print(document);

  const cache = process.env.MODE === "development" ? "no-store" : "force-cache";
  const next =
    process.env.MODE === "development"
      ? { revalidate: 0 }
      : { revalidate: 60 * 60, tags: ["datocms"] };

  try {
    const res = await fetch("https://graphql.datocms.com/", {
      cache,
      next,
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error(
        "🚨 DatoCMS GraphQL errors:",
        JSON.stringify(json.errors, null, 2)
      );
      // throw new Error("DatoCMS GraphQL Error");
    }

    if (!json.data) {
      console.error(
        "❌ No data returned from DatoCMS:",
        JSON.stringify(json, null, 2)
      );
      // throw new Error("No data in response from DatoCMS");
    }

    return json.data;
  } catch (err) {
    console.error("💥 fetchDato failed:", err);
    throw err;
  }
}
