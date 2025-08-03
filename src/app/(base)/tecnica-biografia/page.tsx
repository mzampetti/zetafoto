import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { AboutPageDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import { SRCImage } from "react-datocms";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(AboutPageDocument, { locale: siteLocale });
  const page: any = data?.aboutPage || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}
export default async function Page() {
  const data = await fetchDato(AboutPageDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });
  if (!data?.aboutPage) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.aboutPage._modelApiKey}
      pages={[data.aboutPage]}
    >
      <TextHero heroTitle={data.aboutPage.title} locale={locale} />
      <section className="bg-primary text-primary-content pb-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 xl:gap-x-20 md:grid-cols-12">
            <div className="md:col-span-8">
              <div
                className="formatted"
                dangerouslySetInnerHTML={{
                  __html: data.aboutPage.techniqueText,
                }}
              />
            </div>
            <div className="md:col-span-4">
              <SRCImage data={data.aboutPage.techniqueImage.responsiveImage} />
            </div>
          </div>
          <div className="mt-6 xl:mt-10 grid gap-12 gap-x-6 xl:gap-x-20 md:grid-cols-12">
            <div className="md:col-span-8">
              <div
                className="formatted"
                dangerouslySetInnerHTML={{
                  __html: data.aboutPage.aboutText,
                }}
              />
              <div
                className="formatted"
                dangerouslySetInnerHTML={{
                  __html: data.aboutPage.creditsText,
                }}
              />
            </div>
            <div className="md:col-span-4">
              <SRCImage data={data.aboutPage.aboutImage.responsiveImage} />
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
