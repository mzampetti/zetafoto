import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { TechniqueDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import IndexProducts from "@/components/Templates/IndexProducts";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(
    TechniqueDocument,
    { locale: siteLocale, slug },
    false
  );
  const page: any = data?.technique || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page({ params: { slug } }: Params) {
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
  let list = [];
  let allProducts = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      TechniqueDocument,
      {
        locale: siteLocale,
        skip: page * 100,
        slug,
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
        tmp="technique"
        page={data.technique}
        list={list}
        locale={siteLocale}
      />
    </Wrapper>
  );
}
