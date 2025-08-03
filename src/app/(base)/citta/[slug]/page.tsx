import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { CityDocument, SiteLocale } from "@/graphql/generated";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import IndexTmp from "@/components/Templates/IndexTmp";
import Wrapper from "@/components/Wrapper";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(CityDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.city || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(CityDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.city) notFound();
  const hrefs: hrefsProp = pickHrefs(data.city);
  return (
    <Wrapper
      hrefs={hrefs}
      locale={locale}
      model={data.city._modelApiKey}
      pages={[data.citiesIndex, data.city]}
    >
      <IndexTmp locale={locale} record={data.city} />
    </Wrapper>
  );
}
