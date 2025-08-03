import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { LocationsIndexDocument, SiteLocale } from "@/graphql/generated";
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
  const data = await fetchDato(LocationsIndexDocument, { locale: siteLocale });
  const page: any = data?.locationsIndex || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}
export default async function Page() {
  const data = await fetchDato(LocationsIndexDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });
  let list = [];
  let allLocations = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(LocationsIndexDocument, {
      locale: siteLocale,
      skip: page * 100,
    });
    if (results?.allLocations?.length > 0) {
      allLocations = [...allLocations, ...results.allLocations];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allLocations;
  if (!data?.locationsIndex) notFound();

  const locationsWithPhotos = data.allLocations.filter(
    (item: any) => item.photos && item.photos.length > 0
  );

  const locationsWithRandomPhoto = locationsWithPhotos.map((item: any) => ({
    ...item,
    randomPhoto: shuffle([...item.photos])[0],
  }));

  return (
    <Wrapper
      locale={locale}
      model={data.locationsIndex._modelApiKey}
      pages={[data.locationsIndex]}
    >
      <TextHero heroTitle={data.locationsIndex.title} locale={locale} />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {locationsWithRandomPhoto.map((item: any) => (
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
                  {item.randomPhoto.city && (
                    <div className="font-light">
                      {item.randomPhoto.city.name}
                    </div>
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
