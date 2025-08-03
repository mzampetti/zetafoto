import fetchDato from "@/lib/fetchDato";
import { AuthorsIndexDocument, SiteLocale } from "@/graphql/generated";
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
export const revalidate = 3600; // rigenera ogni ora

export async function generateMetadata() {
  const data = await fetchDato(AuthorsIndexDocument, { locale: siteLocale });

  const page = data?.authorsIndex;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page() {
  const data = await fetchDato(AuthorsIndexDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });

  if (!data?.authorsIndex) return notFound();

  // Caricamento di tutti gli autori paginati
  let allAuthors: any[] = [];
  let page = 0;
  while (true) {
    const results = await fetchDato(AuthorsIndexDocument, {
      locale: siteLocale,
      skip: page * 100,
    });

    if (results?.allAuthors?.length > 0) {
      allAuthors = [...allAuthors, ...results.allAuthors];
      page++;
    } else {
      break;
    }
  }

  const authorsWithPhotos = allAuthors.filter(
    (item: any) => item.photos && item.photos.length > 0
  );

  const authorsWithRandomPhoto = authorsWithPhotos.map((item: any) => ({
    ...item,
    randomPhoto: shuffle([...item.photos])[0],
  }));

  return (
    <Wrapper
      locale={locale}
      model={data.authorsIndex._modelApiKey}
      pages={[data.authorsIndex]}
    >
      <TextHero heroTitle={data.authorsIndex.title} locale={locale} />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {authorsWithRandomPhoto.map((item: any) => (
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
                <div>
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
