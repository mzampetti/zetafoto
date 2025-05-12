"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { SRCImage } from "react-datocms";
import { A11y, Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css/a11y";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import translate from "@/labels";
import { useState } from "react";
import { FileField, TechniqueRecord } from "@/graphql/generated";
import InternalLink from "../Links/InternalLink";
import "react-image-lightbox/style.css";
import Fancybox from "@/lib/fancybox";

export default function GalleryProduct({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) {
  const nextEl = `#nextButton-${data.id}`;
  const prevEl = `#prevButton-${data.id}`;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = data.images ? Object.values(data.images as FileField[]) : [];
  const fullImages = data.images
    ? Object.values(data.fullImages as FileField[])
    : [];

  return (
    <div className="overflow-hidden max-w-[100vw] my-2 md:mt-10 mb-12 xl:-mt-20 xl:mb-20">
      <div className="container relative gallery xl:w-10/12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <Swiper
                keyboard={true}
                modules={[A11y, Navigation, FreeMode, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                slidesPerView={"auto"}
                spaceBetween={30}
                className="slider-auto-width"
                navigation={{
                  nextEl: nextEl,
                  prevEl: prevEl,
                }}
                a11y={{
                  firstSlideMessage: translate("firstSlideMessage", locale),
                  lastSlideMessage: translate("This is the last slide", locale),
                  nextSlideMessage: translate("Next slide", locale),
                  prevSlideMessage: translate("Previous slide", locale),
                  paginationBulletMessage:
                    translate("Go to slide", locale) + "{{index}}",
                }}
              >
                {images.map((img: any, index: number) => (
                  <SwiperSlide
                    className="aspect-square relative !w-full border border-[#E5E5E5] cursor-pointer"
                    key={img.id}
                  >
                    <a
                      data-fancybox="gallery"
                      href={img.responsiveImage.srcSet}
                    >
                      <SRCImage
                        className="object-contain !h-full"
                        data={img.responsiveImage}
                        usePlaceholder={false}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Fancybox>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              breakpoints={{
                1025: {
                  slidesPerView: 6,
                },
              }}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbSwiper mt-2"
            >
              {data.thumb &&
                Object.values(data.thumb).map((img: any) => (
                  <SwiperSlide
                    className="aspect-square relative border border-[#E5E5E5] cursor-pointer"
                    key={img.id}
                  >
                    <SRCImage
                      className="object-contain !h-full"
                      data={img.responsiveImage}
                      usePlaceholder={false}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="">
            <div className="font-bold">
              {locale === "it" ? "Codice articolo:" : "Product code:"}{" "}
              {data.serial}
            </div>
            <div
              className="font-light text-sm my-4"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            <div className="font-bold mb-4">
              {locale === "it" ? "Indicato per:" : "Indicated for:"}
            </div>
            <div className="flex gap-1.5 flex-wrap mb-8 mt-1">
              {data.techniques.map((t: TechniqueRecord, i: number) => (
                <InternalLink
                  className="group"
                  locale={locale}
                  record={t}
                  key={t.id}
                >
                  <span className="text-xs bg-secondary/10 text-black group-hover:underline underline-offset-2 rounded-md w-auto px-3 py-1.5 font-medium duration-200 group-hover:bg-secondary/5 truncate whitespace-nowrap">
                    {t.name}
                  </span>
                </InternalLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
