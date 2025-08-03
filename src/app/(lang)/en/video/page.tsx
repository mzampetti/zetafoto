import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { VideosIndexDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import TextHero from "@/components/Hero/TextHero";
import InternalLink from "@/components/Links/InternalLink";
import Image from "next/image";

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export async function generateMetadata() {
  const data = await fetchDato(VideosIndexDocument, { locale: siteLocale });
  const page: any = data?.videosIndex || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}
export default async function Page() {
  const data = await fetchDato(VideosIndexDocument, {
    locale: siteLocale,
    fallbackLocales: [defaultLocale],
  });
  let list = [];
  let allVideos = [];
  let exitCondition = true;
  let page = 0;
  while (exitCondition) {
    const results = await fetchDato(VideosIndexDocument, {
      locale: siteLocale,
      skip: page * 100,
    });
    if (results?.allVideos?.length > 0) {
      allVideos = [...allVideos, ...results.allVideos];
      page++;
    } else {
      exitCondition = false;
    }
  }
  list = allVideos;
  if (!data?.videosIndex) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.videosIndex._modelApiKey}
      pages={[data.videosIndex]}
    >
      <TextHero heroTitle={data.videosIndex.title} locale={locale} />
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 xl:gap-x-12 md:grid-cols-2">
            {data.allVideos.map((item: any) => (
              <InternalLink
                record={item}
                locale={locale}
                title={item.title}
                className="group"
                key={item.id}
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={item.urlVideo.thumbnailUrl}
                    alt={item.title}
                    title={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="xl:text-md pt-2">{item.title}</h2>
              </InternalLink>
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
