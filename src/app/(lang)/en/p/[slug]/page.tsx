import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ProductDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import ProductTmp from "@/components/Templates/ProductTmp";

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
    ProductDocument,
    { locale: siteLocale, slug },
    false
  );
  const page: any = data?.product || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ProductDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.product) notFound();

  const hrefs: hrefsProp = pickHrefs(data.product);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <ProductTmp page={data.product} locale={siteLocale} />
    </Wrapper>
  );
}
