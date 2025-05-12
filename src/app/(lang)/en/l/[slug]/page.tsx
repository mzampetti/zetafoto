import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { LegislationPageDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import LegalPageTmp from "@/components/Templates/LegalPageTmp";
import { notFound } from "next/navigation";

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
    LegislationPageDocument,
    { locale: siteLocale, slug },
    false
  );

  const page: any = data?.legislationPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    LegislationPageDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.legislationPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.legislationPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <LegalPageTmp
        page={data.legislationPage}
        home={data.homepage}
        locale={siteLocale}
      />
    </Wrapper>
  );
}
