import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { PhotoDocument, PhotoRecord, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import { hrefsProp } from "@/_types";

import { SRCImage } from "react-datocms";
import FancyboxWrapper from "@/components/Layout/FancyboxWrapper";
import translate from "@/labels";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";
import OtherPhotosSection from "@/components/Layout/OtherPhotosSection";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { pickHrefs } from "@/lib/pickPageData";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(
    PhotoDocument,
    {
      locale: siteLocale,
      slug,
    },
    false
  );
  const page: any = data?.photo || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    PhotoDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.photo) notFound();

  const tags: string[] = [
    data.photo.buildingCategory?.name,
    ...(data.photo.authors?.map((a: any) => a.name) || []),
    ...(data.photo.architectonicElements?.map((e: any) => e.name) || []),
    ...(data.photo.architectonicStyles?.map((s: any) => s.name) || []),
  ].filter(Boolean);

  const hrefs: hrefsProp = pickHrefs(data.photo);

  return (
    <Wrapper
      hrefs={hrefs}
      locale={locale}
      model={data.photo._modelApiKey}
      pages={[data.photo.city, data.photo.location, data.photo]}
    >
      <header className="bg-secondary pb-12">
        <div className="container">
          <FancyboxWrapper>
            <a
              href={data.photo.image.responsiveImage.src}
              data-fancybox="gallery"
              className="group"
            >
              <SRCImage data={data.photo.image.responsiveImage} />
              <div className="bg-secondary text-secondary-content sticky bottom-0 inline-block mx-auto left-1/2 -translate-x-1/2 group-hover:-translate-y-2 duration-300 px-4 py-2 rounded-md font-bold">
                <div className="flex items-center gap-1">
                  <MagnifyingGlassPlusIcon className="size-6 text-white" />
                  {translate("zoom", locale)}
                </div>
              </div>
            </a>
          </FancyboxWrapper>
        </div>
      </header>
      <div className="py-6 md:py-12">
        <div className="container grid xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <div>
              <h1 className="font-semibold text-lg md:text-xl">
                {data.photo.title}
              </h1>
              {data.photo.title !== data.photo.location.name && (
                <div className="font-light text-md mt-2 md:text-lg">
                  {data.photo.location.name}
                </div>
              )}
              <div className="font-light text-md md:text-lg">
                {data.photo.city.name}
              </div>
              {data.photo.captureDate && (
                <div className="mt-2 font-light md:mt-3">
                  {data.photo.captureDate}
                </div>
              )}
              {data.photo.permissions && (
                <div className="mt-1 font-light">{data.photo.permissions}</div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 pt-6 pb-2 md:max-w-2/3">
              {tags.map((t, n) => (
                <div
                  className="bg-[#e0e0e0] font-semibold text-sm px-3 py-2"
                  key={n}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
          <div className="formatted">
            {data.photo.sellingOptions.length > 0 && (
              <>
                <div className="font-bold text-md mb-2">
                  {translate("sellingOption", locale)}
                </div>
                <ul>
                  {data.photo.sellingOptions.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <div className="inline-block">
                  <Link
                    className="flex text-sm font-semibold items-center gap-1 bg-[#e0e0e0] px-3 py-2.5 !no-underline rounded-sm duration-200 hover:bg-secondary/20"
                    href="mailto:info@francozampetti.it"
                  >
                    {translate("contactEmail", locale)}
                    <EnvelopeIcon className="size-3 text-secondary" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {}
      </div>
      <OtherPhotosSection
        title={data.photo.location.name}
        record={data.photo.location}
        photos={data.photo.location.otherPhotos}
        total={data.photo.location.allOtherPhotos.length}
        locale={locale}
      />

      <OtherPhotosSection
        title={data.photo.city.name}
        record={data.photo.city}
        photos={data.photo.city.otherPhotos}
        total={data.photo.city.allOtherPhotos.length}
        locale={locale}
      />

      {data.photo.authors &&
        data.photo.authors.map((item: any) => (
          <OtherPhotosSection
            title={item.name}
            record={item}
            photos={item.otherPhotos}
            total={item.allOtherPhotos.length}
            locale={locale}
          />
        ))}

      {data.photo.architectonicElements &&
        data.photo.architectonicElements.map((item: any) => (
          <OtherPhotosSection
            title={item.name}
            record={item}
            photos={item.otherPhotos}
            total={item.allOtherPhotos.length}
            locale={locale}
          />
        ))}

      {data.photo.architectonicStyles &&
        data.photo.architectonicStyles.map((item: any) => (
          <OtherPhotosSection
            title={item.name}
            record={item}
            photos={item.otherPhotos}
            total={item.allOtherPhotos.length}
            locale={locale}
          />
        ))}
    </Wrapper>
  );
}
