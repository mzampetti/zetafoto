import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ProductsPageDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import IndexProducts from "@/components/Templates/IndexProducts";
import { notFound } from "next/navigation";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    ProductsPageDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.productsPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ProductsPageDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  let list = [];
  let allProducts = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      ProductsPageDocument,
      {
        locale: siteLocale,
        skip: page * 100,
      },
      isEnabled
    );
    if (results?.allProducts?.length > 0) {
      allProducts = [...allProducts, ...results.allProducts];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allProducts;
  if (!data?.productsPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.productsPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <IndexProducts page={data.productsPage} list={list} locale={siteLocale} />
    </Wrapper>
  );
}
