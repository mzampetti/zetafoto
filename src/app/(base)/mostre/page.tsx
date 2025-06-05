import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ExpositionsIndexDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import Image from "next/image";
import translate from "@/labels";
import ButtonBlock from "@/components/Blocks/ButtonBlock";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    ExpositionsIndexDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.expositionsIndex || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ExpositionsIndexDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  let list = [];
  let allExpositions = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      ExpositionsIndexDocument,
      {
        locale: siteLocale,
        skip: page * 100,
      },
      isEnabled
    );
    if (results?.allExpositions?.length > 0) {
      allExpositions = [...allExpositions, ...results.allExpositions];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allExpositions;
  if (!data?.expositionsIndex) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.expositionsIndex._modelApiKey}
      pages={[data.expositionsIndex]}
    >
      <TextHero heroTitle={data.expositionsIndex.title} locale={locale} />
      <section className="bg-primary text-primary-content py-8 pb-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 xl:gap-x-12 md:grid-cols-2">
            {data.allExpositions.map((item: any) => (
              <div>
                <h2 className="text-lg pt-2 font-bold">{item.title}</h2>
                <div className="mt-2">{item.location}</div>
                <div className="">{item.timePeriod}</div>
                <InternalLink
                  record={item}
                  locale={locale}
                  title={item.title}
                  key={item.id}
                >
                  <ButtonBlock label={translate("readMore", locale)} />
                </InternalLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
