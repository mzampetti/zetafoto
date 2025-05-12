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
  const hasEnv = process.env.DATO_ENV || null;
  if (hasEnv) headers["X-Environment"] = `${process.env.DATO_ENV || ""}`;
  if (isDraft) headers["X-Include-Drafts"] = "true";

  const query = print(document);
  // console.log("====================================");
  // console.log(query);
  // console.log(variables);
  // console.log("====================================");

  const cache = process.env.MODE === "development" ? "no-store" : "force-cache";
  const next =
    process.env.MODE === "development"
      ? { revalidate: 0 }
      : { revaldate: 60 * 60, tags: ["datocms"] };

  const { data } = await (
    await fetch("https://graphql.datocms.com/", {
      cache,
      next,
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    })
  ).json();

  return data;
}
