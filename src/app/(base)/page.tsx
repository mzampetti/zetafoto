import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  HomeDocument,
  NewsRecord,
  ProductRecord,
  SiteLocale,
} from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import HomePage from "@/components/Templates/HomePage";
import getSeoMeta from "@/lib/seoUtils";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    HomeDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    false
  );
  const page: any = data?.homepage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    HomeDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  const hrefs: hrefsProp = pickHrefs(data.homepage);
  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <HomePage
        page={data.homepage as any}
        products={data.allProducts as ProductRecord[]}
        news={data.allNews as NewsRecord[]}
        locale={locale as SiteLocale}
      />
    </Wrapper>
  );
}
