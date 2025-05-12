import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { CompanyPageDocument, SiteLocale } from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import PageTmp from "@/components/Templates/PageTmp";
import { notFound } from "next/navigation";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    CompanyPageDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.companyPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    CompanyPageDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  if (!data?.companyPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.companyPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <PageTmp page={data.companyPage} locale={siteLocale} />
    </Wrapper>
  );
}
