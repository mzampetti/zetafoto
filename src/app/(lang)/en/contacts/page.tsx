import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  ContactPageDocument,
  ContactPageRecord,
  SiteLocale,
} from "@/graphql/generated";
import { pickHrefs } from "@/lib/pickPageData";
import { hrefsProp } from "@/_types";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import PageContactTmp from "@/components/Templates/PageContactTmp";
import { notFound } from "next/navigation";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    ContactPageDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.contactPage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ContactPageDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  if (!data?.contactPage) notFound();
  const hrefs: hrefsProp = pickHrefs(data.contactPage);

  return (
    <Wrapper hrefs={hrefs} locale={locale}>
      <PageContactTmp
        page={data.contactPage as any}
        locale={siteLocale}
        home={data.homepage as any}
      />
    </Wrapper>
  );
}
