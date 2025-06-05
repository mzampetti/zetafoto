import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  PhotosCollectionsIndexDocument,
  SiteLocale,
} from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import { SRCImage } from "react-datocms";
import { shuffle } from "@/lib/shuffle";
import translate from "@/labels";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    PhotosCollectionsIndexDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.photosCollectionsIndex || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    PhotosCollectionsIndexDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  let list = [];
  let allPhotosCollections = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      PhotosCollectionsIndexDocument,
      {
        locale: siteLocale,
        skip: page * 100,
      },
      isEnabled
    );
    if (results?.allPhotosCollections?.length > 0) {
      allPhotosCollections = [
        ...allPhotosCollections,
        ...results.allPhotosCollections,
      ];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allPhotosCollections;
  if (!data?.photosCollectionsIndex) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.photosCollectionsIndex._modelApiKey}
      pages={[data.photosCollectionsIndex]}
    >
      <TextHero heroTitle={data.photosCollectionsIndex.title} locale={locale} />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {allPhotosCollections.map((item: any) => (
              <InternalLink
                record={item}
                locale={locale}
                title={`${item.photos[0].location.name} - ${item.photos[0].city.name}`}
                className="group"
                key={item.id}
              >
                {item.photos[0].image && (
                  <SRCImage
                    className="brightness-75 group-hover:brightness-100 transition-all motion-safe:duration-300"
                    data={item.photos[0].image.responsiveImage}
                  />
                )}
                <div className="">
                  {item.name && (
                    <h3 className="mt-2 font-semibold text-md">{item.name}</h3>
                  )}
                  {item.photos.length} {translate("photo", locale)}
                </div>
              </InternalLink>
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
