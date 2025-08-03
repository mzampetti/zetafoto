import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { VideoDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import { hrefsProp } from "@/_types";
import { pickHrefs } from "@/lib/pickPageData";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(VideoDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.video || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(VideoDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.video) notFound();

  const video = data.video.urlVideo;
  const streamUrl = "https://www.youtube.com/embed/" + video.providerUid;
  const hrefs: hrefsProp = pickHrefs(data.video);

  return (
    <Wrapper
      locale={locale}
      model={data.video._modelApiKey}
      pages={[data.videosIndex, data.video]}
      hrefs={hrefs}
    >
      <div className="py-6 md:py-12">
        <div className="container">
          <div>
            <h1 className="font-semibold text-lg md:text-xl">
              {data.video.title}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-secondary lg:pb-12">
        <div className="container">
          <div className="aspect-video relative">
            <iframe
              width="100%"
              height="100%"
              src={streamUrl}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture"
              allowFullScreen={true}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
