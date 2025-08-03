import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { CitiesIndexDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import { SRCImage } from "react-datocms";
import { shuffle } from "@/lib/shuffle";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata() {
  const data = await fetchDato(CitiesIndexDocument, { locale: siteLocale });
  const page: any = data?.citiesIndex || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}
export default async function Page() {
  const data = await fetchDato(CitiesIndexDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });
  let list = [];
  let allCities = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(CitiesIndexDocument, {
      locale: siteLocale,
      skip: page * 100,
    });
    if (results?.allCities?.length > 0) {
      allCities = [...allCities, ...results.allCities];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allCities;
  if (!data?.citiesIndex) notFound();

  const citiesWithPhotos = data.allCities.filter(
    (item: any) => item.photos && item.photos.length > 0
  );

  const citiesWithRandomPhoto = citiesWithPhotos.map((item: any) => ({
    ...item,
    randomPhoto: shuffle([...item.photos])[0],
  }));

  return (
    <Wrapper
      locale={locale}
      model={data.citiesIndex._modelApiKey}
      pages={[data.citiesIndex]}
    >
      <TextHero heroTitle={data.citiesIndex.title} locale={locale} />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {citiesWithRandomPhoto.map((item: any) => (
              <InternalLink
                record={item}
                locale={locale}
                title={`${item.randomPhoto.location.name} - ${item.randomPhoto.city.name}`}
                className="group"
                key={item.id}
              >
                {item.randomPhoto.image && (
                  <SRCImage
                    className="brightness-75 group-hover:brightness-100 transition-all motion-safe:duration-300"
                    data={item.randomPhoto.image.responsiveImage}
                  />
                )}
                <div className="">
                  {item.name && (
                    <h3 className="mt-2 font-semibold text-md">{item.name}</h3>
                  )}
                </div>
              </InternalLink>
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
