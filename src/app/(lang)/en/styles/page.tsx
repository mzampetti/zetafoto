import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  ArchitectonicStylesIndexDocument,
  SiteLocale,
} from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import { SRCImage } from "react-datocms";
import { shuffle } from "@/lib/shuffle";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(
    ArchitectonicStylesIndexDocument,
    { locale: siteLocale },
    false
  );
  const page: any = data?.architectonicStylesIndex || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}
export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    ArchitectonicStylesIndexDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  let list = [];
  let allArchitectonicStyles = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(
      ArchitectonicStylesIndexDocument,
      {
        locale: siteLocale,
        skip: page * 100,
      },
      isEnabled
    );
    if (results?.allArchitectonicStyles?.length > 0) {
      allArchitectonicStyles = [
        ...allArchitectonicStyles,
        ...results.allArchitectonicStyles,
      ];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allArchitectonicStyles;
  if (!data?.architectonicStylesIndex) notFound();

  const architectonicStylesWithPhotos = data.allArchitectonicStyles.filter(
    (item: any) => item.photos && item.photos.length > 0
  );

  const architectonicStylesWithRandomPhoto = architectonicStylesWithPhotos.map(
    (item: any) => ({
      ...item,
      randomPhoto: shuffle([...item.photos])[0],
    })
  );

  return (
    <Wrapper
      locale={locale}
      model={data.architectonicStylesIndex._modelApiKey}
      pages={[data.architectonicStylesIndex]}
    >
      <TextHero
        heroTitle={data.architectonicStylesIndex.title}
        locale={locale}
      />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {architectonicStylesWithRandomPhoto.map((item: any) => (
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
