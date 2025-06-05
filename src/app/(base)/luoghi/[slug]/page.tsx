import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { LocationDocument, SiteLocale } from "@/graphql/generated";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import IndexTmp from "@/components/Templates/IndexTmp";
import Wrapper from "@/components/Wrapper";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(
    LocationDocument,
    {
      locale: siteLocale,
      slug,
    },
    false
  );
  const page: any = data?.location || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    LocationDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.location) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.location._modelApiKey}
      pages={[data.locationsIndex, data.location]}
    >
      <IndexTmp locale={locale} record={data.location} />
    </Wrapper>
  );
}
