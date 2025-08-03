import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { AuthorDocument, SiteLocale } from "@/graphql/generated";
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

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(AuthorDocument, {
    locale: siteLocale,
    slug,
  });
  const page = data?.author;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(AuthorDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.author) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.author._modelApiKey}
      pages={[data.authorsIndex, data.author]}
      hrefs={{
        it: `/autori/${data.author.slug}`,
        en: `/en/authors/${data.author.slug}`,
      }}
    >
      <IndexTmp locale={locale} record={data.author} />
    </Wrapper>
  );
}
