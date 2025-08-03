import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ArticlesIndexDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import translate from "@/labels";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import ExternalLink from "@/components/Links/ExternalLink";
import { getDate } from "@/lib/getDate";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(ArticlesIndexDocument, { locale: siteLocale });
  const page: any = data?.articlesIndex || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}
export default async function Page() {
  const data = await fetchDato(ArticlesIndexDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });
  let list = [];
  let allArticles = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(ArticlesIndexDocument, {
      locale: siteLocale,
      skip: page * 100,
    });
    if (results?.allArticles?.length > 0) {
      allArticles = [...allArticles, ...results.allArticles];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allArticles;
  if (!data?.articlesIndex) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.articlesIndex._modelApiKey}
      pages={[data.articlesIndex]}
    >
      <TextHero heroTitle={data.articlesIndex.title} locale={locale} />
      <section className="bg-primary text-primary-content py-8 pb-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 xl:gap-x-12 xl:grid-cols-2">
            {data.allArticles.map((item: any) => (
              <div>
                <div className="">{getDate(item.date, locale)}</div>
                <h2 className="text-lg pt-2 font-bold">{item.title}</h2>
                <div
                  className="mt-2 max-w-prose"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                <div className="flex gap-3">
                  {item.externalLink && (
                    <ExternalLink
                      url={item.externalLink}
                      locale={locale}
                      title={item.externalLink}
                    >
                      <ButtonBlock label={translate("readMore", locale)} />
                    </ExternalLink>
                  )}
                  {item.attachment && (
                    <ExternalLink
                      url={item.attachment.url}
                      locale={locale}
                      title={item.attachment.url}
                    >
                      <ButtonBlock label={translate("downloadPdf", locale)} />
                    </ExternalLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
