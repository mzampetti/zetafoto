import fetchDato from "@/lib/fetchDato";
import { PhotoDocument, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import { hrefsProp } from "@/_types";

import { SRCImage } from "react-datocms";
import FancyboxWrapper from "@/components/Layout/FancyboxWrapper";
import translate from "@/labels";
import {
  MagnifyingGlassPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import OtherPhotosSection from "@/components/Layout/OtherPhotosSection";
import Link from "next/link";
import { pickHrefs } from "@/lib/pickPageData";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const defaultLocale = "it" as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(PhotoDocument, {
    locale,
    slug,
  });

  const page: any = data?.photo || null;
  if (!page) return {};
  return getSeoMeta(page, locale);
}

export default async function Page({ params: { slug } }: Params) {
  const data = await fetchDato(PhotoDocument, {
    locale,
    slug,
  });

  if (!data?.photo) return notFound();

  const { photo } = data;

  const tags: string[] = [
    photo.buildingCategory?.name,
    ...(photo.authors?.map((a: any) => a.name) || []),
    ...(photo.architectonicElements?.map((e: any) => e.name) || []),
    ...(photo.architectonicStyles?.map((s: any) => s.name) || []),
  ].filter(Boolean);

  const hrefs: hrefsProp = pickHrefs(photo);

  return (
    <Wrapper
      hrefs={hrefs}
      locale={locale}
      model={photo._modelApiKey}
      pages={[photo.city, photo.location, photo]}
    >
      <header className="bg-secondary lg:pb-12">
        <div className="container">
          <FancyboxWrapper>
            <a
              href={photo.image.responsiveImage.src}
              data-fancybox="gallery"
              className="group"
            >
              <SRCImage data={photo.image.responsiveImage} />
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
              <h1>
                <div className="font-semibold text-lg md:text-xl">
                  {photo.title}
                </div>
                {photo.title !== photo.location.name && (
                  <div className="font-light text-md mt-2 md:text-lg">
                    {photo.location.name}
                  </div>
                )}
                <div className="font-light text-md md:text-lg">
                  {photo.city.name}
                </div>
              </h1>
              {photo.captureDate && (
                <div className="mt-2 font-light md:mt-3">
                  {photo.captureDate}
                </div>
              )}
              {photo.permissions && (
                <div className="mt-1 font-light">{photo.permissions}</div>
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
            {photo.sellingOptions.length > 0 && (
              <>
                <div className="font-bold text-md mb-2">
                  {translate("sellingOption", locale)}
                </div>
                <ul>
                  {photo.sellingOptions.map((item) => (
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
      </div>

      <OtherPhotosSection
        title={photo.location.name}
        record={photo.location}
        photos={photo.location.otherPhotos}
        total={photo.location.allOtherPhotos.length}
        locale={locale}
      />

      <OtherPhotosSection
        title={photo.city.name}
        record={photo.city}
        photos={photo.city.otherPhotos}
        total={photo.city.allOtherPhotos.length}
        locale={locale}
      />

      {photo.authors?.map((item: any) => (
        <OtherPhotosSection
          key={item.id}
          title={item.name}
          record={item}
          photos={item.otherPhotos}
          total={item.allOtherPhotos.length}
          locale={locale}
        />
      ))}

      {photo.architectonicElements?.map((item: any) => (
        <OtherPhotosSection
          key={item.id}
          title={item.name}
          record={item}
          photos={item.otherPhotos}
          total={item.allOtherPhotos.length}
          locale={locale}
        />
      ))}

      {photo.architectonicStyles?.map((item: any) => (
        <OtherPhotosSection
          key={item.id}
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
