"use client";

import { useEffect, useRef, useState } from "react";
import { SRCImage } from "react-datocms";

export default function ImageBlock({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [translateYImage, setTranslateYImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        );
        setTranslateYImage(-75 * progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container py-12">
      <div
        ref={imgRef}
        className="aspect-[11/15] relative overflow-hidden lg:aspect-video"
      >
        <SRCImage
          data={data.mobileImg.responsiveImage}
          className="absolute inset-0 lg:hidden !h-[120%] object-cover"
          style={{
            transform: `translateY(${translateYImage}px)`,
            transition: "transform 0.1s linear",
          }}
        />
        <SRCImage
          data={data.deskImg.responsiveImage}
          className="absolute inset-0 hidden lg:block !h-[120%] object-cover"
          style={{
            transform: `translateY(${translateYImage}px)`,
            transition: "transform 0.1s linear",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
