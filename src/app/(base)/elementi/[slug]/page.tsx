import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ArchitectonicElementDocument, SiteLocale } from "@/graphql/generated";
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

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(ArchitectonicElementDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.architectonicElement || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(ArchitectonicElementDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.architectonicElement) notFound();

  const hrefs: hrefsProp = pickHrefs(data.architectonicElement);

  return (
    <Wrapper
      locale={locale}
      model={data.architectonicElement._modelApiKey}
      pages={[data.architectonicElementsIndex, data.architectonicElement]}
      hrefs={hrefs}
    >
      <IndexTmp locale={locale} record={data.architectonicElement} />
    </Wrapper>
  );
}
