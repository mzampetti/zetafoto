import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ArchitectonicStyleDocument, SiteLocale } from "@/graphql/generated";
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
    ArchitectonicStyleDocument,
    {
      locale: siteLocale,
      slug,
    },
    false
  );
  const page: any = data?.architectonicStyle || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ArchitectonicStyleDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.architectonicStyle) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.architectonicStyle._modelApiKey}
      pages={[data.architectonicStylesIndex, data.architectonicStyle]}
    >
      <IndexTmp locale={locale} record={data.architectonicStyle} />
    </Wrapper>
  );
}
