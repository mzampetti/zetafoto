import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { SearchPageDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import SearchPage from "@/components/Templates/SearchPage";
import { notFound } from "next/navigation";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    SearchPageDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.searchPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    SearchPageDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  if (!data?.searchPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.searchPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <SearchPage data={data.searchPage} locale={siteLocale} />
    </Wrapper>
  );
}
