import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ArchitectonicStyleDocument, SiteLocale } from "@/graphql/generated";
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
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(ArchitectonicStyleDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.architectonicStyle || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(ArchitectonicStyleDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.architectonicStyle) notFound();
  const hrefs: hrefsProp = pickHrefs(data.architectonicStyle);

  return (
    <Wrapper
      locale={locale}
      model={data.architectonicStyle._modelApiKey}
      pages={[data.architectonicStylesIndex, data.architectonicStyle]}
      hrefs={hrefs}
    >
      <IndexTmp locale={locale} record={data.architectonicStyle} />
    </Wrapper>
  );
}
