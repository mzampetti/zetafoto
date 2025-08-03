import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { ExpositionDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import { text } from "stream/consumers";
import ExternalLink from "@/components/Links/ExternalLink";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import translate from "@/labels";
import { SRCImage } from "react-datocms";
import { hrefsProp } from "@/_types";
import { pickHrefs } from "@/lib/pickPageData";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "en" as SiteLocale;
const siteLocale = locale as SiteLocale;
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(ExpositionDocument, {
    locale: siteLocale,
    slug,
  });
  const page: any = data?.exposition || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(ExpositionDocument, {
    locale: siteLocale,
    slug,
  });
  if (!data?.exposition) notFound();

  const exposition = data.exposition;
  const {
    location,
    timePeriod,
    title,
    _modelApiKey,
    text,
    attachment,
    galleryImages,
  } = exposition;
  const hrefs: hrefsProp = pickHrefs(data.exposition);

  return (
    <Wrapper
      locale={locale}
      hrefs={hrefs}
      model={_modelApiKey}
      pages={[data.expositionsIndex, exposition]}
    >
      <div className="py-6 md:py-12">
        <div className="container">
          <div>
            <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
            <div className="mt-2 text-md lg:text-lg font-light">
              {location && <div className="">{location}</div>}
              {timePeriod && <div className="">{timePeriod}</div>}
            </div>
            {text && (
              <div
                dangerouslySetInnerHTML={{ __html: text }}
                className="font-light max-w-prose mt-3"
              />
            )}
            {attachment && (
              <ExternalLink
                url={attachment.url}
                title={translate("download", locale)}
                className="group"
              >
                <ButtonBlock label={translate("download", locale)} />
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
      <section>
        <div className="container pb-6 xl:pb-12">
          <div className="lg:grid lg:grid-cols-2 gap-6">
            {galleryImages.map((image) => (
              <SRCImage key={image.id} data={image.responsiveImage} />
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
