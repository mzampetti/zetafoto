import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  TechniqueToFilterDocument,
  SiteLocale,
  TechniqueDocument,
  CategoryDocument,
} from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import IndexProducts from "@/components/Templates/IndexCategories";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
    categorySlug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug, categorySlug } = params;

  const data = await fetchDato(
    TechniqueDocument,
    { locale: siteLocale, slug },
    false
  );
  const page: any = data?.technique || null;

  const categoryData = await fetchDato(
    CategoryDocument,
    { slug: categorySlug, locale: siteLocale },
    false
  );
  const categoryId = categoryData?.category?.id;

  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page({ params: { slug, categorySlug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    TechniqueDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
      slug,
    },
    isEnabled
  );
  const categoryData = await fetchDato(
    CategoryDocument,
    {
      slug: categorySlug,
      locale: siteLocale,
    },
    isEnabled
  );
  const categoryId = categoryData?.category?.id;
  let list = [];
  let allProducts = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      TechniqueToFilterDocument,
      {
        locale: siteLocale,
        skip: page * 100,
        slug,
        categoryId: categoryId,
      },
      isEnabled
    );
    if (results?.technique.products?.length > 0) {
      allProducts = [...allProducts, ...results.technique.products];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allProducts;

  if (!data?.technique) notFound();
  const hrefs: hrefsProp = pickHrefs(data.technique);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <IndexProducts
        tmp="techniqueFilter"
        page={data.technique}
        list={list}
        locale={siteLocale}
        cat={categoryData?.category as any}
      />
    </Wrapper>
  );
}
