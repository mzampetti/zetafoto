import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { BuildingCategoryDocument, SiteLocale } from "@/graphql/generated";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import IndexTmp from "@/components/Templates/IndexTmp";
import Wrapper from "@/components/Wrapper";
import { hrefsProp } from "@/_types";
import { pickHrefs } from "@/lib/pickPageData";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(BuildingCategoryDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.buildingCategory || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(BuildingCategoryDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.buildingCategory) notFound();
  const hrefs: hrefsProp = pickHrefs(data.buildingCategory);

  return (
    <Wrapper
      hrefs={hrefs}
      locale={locale}
      model={data.buildingCategory._modelApiKey}
      pages={[data.buildingCategoriesIndex, data.buildingCategory]}
    >
      <IndexTmp locale={locale} record={data.buildingCategory} />
    </Wrapper>
  );
}
