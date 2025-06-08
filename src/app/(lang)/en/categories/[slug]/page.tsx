import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { BuildingCategoryDocument, SiteLocale } from "@/graphql/generated";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import IndexTmp from "@/components/Templates/IndexTmp";
import Wrapper from "@/components/Wrapper";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(
    BuildingCategoryDocument,
    {
      locale: siteLocale,
      slug,
    },
    false
  );
  const page: any = data?.buildingCategory || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    BuildingCategoryDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.buildingCategory) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.buildingCategory._modelApiKey}
      pages={[data.buildingCategoriesIndex, data.buildingCategory]}
    >
      <IndexTmp locale={locale} record={data.buildingCategory} />
    </Wrapper>
  );
}
