"use client";

import { SiteLocale } from "@/graphql/generated";
import TextHero from "../Hero/TextHero";
import { Variants } from "framer-motion";
import GalleryProduct from "../Blocks/GalleryProduct";
import TabProduct from "../Blocks/TabProduct";
import Video from "../Blocks/Video";

interface GenericPageProps {
  locale: SiteLocale;
  page: any;
}

const variants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

export default function ProductTmp({ page, locale }: GenericPageProps) {
  const { name, text, image, variantContainer, videoContainer } = page;
  return (
    <>
      <TextHero
        heroTitle={name}
        image={image}
        heroSubtitle={text}
        locale={locale}
        tmp="product"
        page={page}
      />
      <GalleryProduct data={page} locale={locale} />
      {variantContainer.length > 0 && (
        <TabProduct data={variantContainer} locale={locale} />
      )}
      {videoContainer.length > 0 && (
        <div className="container lg:py-6 xl:w-10/12">
          <h2 className="font-bold mb-4 border-b border-primary-content lg:text-md">
            Video
          </h2>
          <div className="md:grid grid-cols-2 gap-6">
            {videoContainer.map((v: any) => (
              <div className="my-6" key={v.id}>
                <Video video={v.videoUrl} />
                <div className="uppercase font-light text-sm lg:text-base">
                  {v.videoTitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
