import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { NewsPageDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import IndexNews from "@/components/Templates/IndexNews";
import { notFound } from "next/navigation";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(NewsPageDocument, { locale: siteLocale }, false);
  const page: any = data?.newsPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    NewsPageDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  let list = [];
  let allNews = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      NewsPageDocument,
      {
        locale: siteLocale,
        skip: page * 100,
      },
      isEnabled
    );
    if (results?.allNews?.length > 0) {
      allNews = [...allNews, ...results.allNews];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allNews;
  if (!data?.newsPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.newsPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <IndexNews page={data.newsPage} list={list} locale={siteLocale} />
    </Wrapper>
  );
}
