import { SRCImage } from "react-datocms";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  A11y,
  Pagination,
  Navigation,
  Parallax,
} from "swiper/modules";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "swiper/css/bundle";
import DynamicLink from "../Links/DynamicLink";
import ButtonBlock from "../Blocks/ButtonBlock";
import { SiteLocale } from "@/graphql/generated";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useState } from "react";
import { useRef } from "react";
import CustomIcon from "../Blocks/CustomIcon";
import InternalLink from "../Links/InternalLink";

export default function Carousel({
  slides,
  locale,
}: {
  slides: any;
  locale: SiteLocale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    slides.forEach((slide: any, index: number) => {
      const videoDiv = document.getElementById(`video-${index}`);
      const videoElement = videoDiv?.querySelector("video");

      if (videoElement) {
        if (index === activeIndex) {
          videoElement.play();
        } else {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });
  }, [activeIndex, slides]);

  const nextEl = `#nextButton`;
  const prevEl = `#prevButton`;

  return (
    <header className={`relative hero-carousel pt-[60px] text-white`}>
      <h1 className="sr-only">
        Stonfo: Azienda Italiana di produzione di articoli e accessori per la
        pesca di qualità
      </h1>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        ref={swiperRef}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: nextEl,
          prevEl: prevEl,
        }}
        modules={[Autoplay, Pagination, Navigation, A11y, Parallax]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        loop={false}
      >
        {slides.map((slide: any, i: number) => {
          const { video, image, title, text, link, cta } = slide;

          return (
            <div className="h-full w-full" key={i}>
              <SwiperSlide key={i}>
                <div className="relative w-full h-[600px] 2xl:h-[700px] 3xl:h-[900px]">
                  <div className="bg-black/60 xl:bg-transparent z-10 absolute inset-0 xl:bg-gradient-to-r xl:from-black/80 to-transparent" />
                  {image && (
                    <SRCImage
                      data={image.responsiveImage}
                      priority={i === 0 ? true : false}
                      className="!h-full !w-full z-0 !max-w-none !object-cover"
                    />
                  )}
                  {video && (
                    <div className="h-full" id={`video-${i}`}>
                      <MediaPlayer
                        title={video.video.title}
                        src={video.video.streamingUrl}
                        muted={true}
                        playsInline={true}
                        className="w-full h-full video-home"
                        autoPlay={false}
                      >
                        <MediaProvider className="h-full w-full" />
                        <DefaultVideoLayout
                          thumbnails={video.video.thumbnailUrl}
                          icons={defaultLayoutIcons}
                        />
                      </MediaPlayer>
                    </div>
                  )}
                  <div className="absolute grid gap-3 top-1/2 font-serif left-1/2 z-20 -translate-y-1/2 -translate-x-1/2 w-full container lg:px-24">
                    {title && (
                      <h2 className="text-lg font-semibold lg:w-[55%]] lg:text-2xl">
                        {title}
                      </h2>
                    )}
                    {text && (
                      <h3
                        dangerouslySetInnerHTML={{ __html: text }}
                        className="lg:w-[55%] tracking-wide font-light xl:w-[45%]"
                      />
                    )}
                    {link && (
                      <InternalLink
                        record={link}
                        locale={locale}
                        className="lg:w-1/2"
                        title={link.title ? link.title : link.name}
                      >
                        <ButtonBlock label={cta ? cta : "vai"} />
                      </InternalLink>
                    )}
                    <button
                      className="absolute -bottom-32 lg:bottom-auto top-auto lg:top-1/2 left-0 -translate-y-1/2 z-10"
                      id="prevButton"
                    >
                      <div className={""}>
                        <CustomIcon
                          classes="bg-white size-12"
                          fileName="chevronLeft"
                        />
                      </div>
                    </button>
                    <button
                      className="absolute -bottom-32 lg:bottom-auto top-auto lg:top-1/2 right-0 -translate-y-1/2 z-10"
                      id="nextButton"
                    >
                      <div className={""}>
                        <CustomIcon
                          classes="bg-white size-12 rotate-180"
                          fileName="chevronRight"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </header>
  );
}
