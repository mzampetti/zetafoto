"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import Legal from "./Legal";
import { SiteLocale } from "@/graphql/generated";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function RealTimeLegal({
  locale,
  initialData,
  token,
  query,
  variables,
}: {
  locale: SiteLocale;
  token: string;
  initialData: any;
  query: any;
  variables: any;
}) {
  const { data } = useQuerySubscription({
    query,
    variables,
    token,
    initialData,
    preview: true,
  });

  if (!data) return <></>;

  return <Legal lng={locale} data={data} />;
}
