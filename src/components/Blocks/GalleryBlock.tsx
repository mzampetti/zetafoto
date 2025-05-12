"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SRCImage } from "react-datocms";
import {
  Autoplay,
  A11y,
  EffectFade,
  Navigation,
  Pagination,
  Parallax,
} from "swiper/modules";
import "swiper/css/a11y";
import "swiper/css/bundle";
import Image from "next/image";

export default function GalleryBlock({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) {
  const swiperRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLeftSide, setIsLeftSide] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPos({ x: clientX, y: clientY });
      setIsLeftSide(clientX < window.innerWidth / 2);
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <div
      className="relative -mb-12 md:-mb-20 cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        ref={swiperRef}
        speed={1000}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation, A11y, Parallax, EffectFade]}
      >
        {data.images.map((img: any) => (
          <SwiperSlide key={img.id}>
            <SRCImage data={img.responsiveImage} className="!max-w-none" />
          </SwiperSlide>
        ))}
      </Swiper>

      {isHovered && (
        <Image
          src={
            !isLeftSide ? "/assets/chevronLeft.svg" : "/assets/chevronRight.svg"
          }
          alt="Navigation Cursor"
          width={150}
          height={150}
          className="fixed transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
          onClick={() =>
            isLeftSide
              ? swiperRef.current?.swiper.slidePrev()
              : swiperRef.current?.swiper.slideNext()
          }
        />
      )}
    </div>
  );
}
