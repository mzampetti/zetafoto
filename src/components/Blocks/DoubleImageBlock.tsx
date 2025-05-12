import { useEffect, useState, useRef } from "react";
import { SRCImage } from "react-datocms";

export default function DoubleImageBlock({ locale, data }) {
  return (
    <div className="container py-8 md:grid md:grid-cols-2 md:gap-6 xl:gap-16">
      {data.images.map((i: any) => (
        <ImageWrapper key={i.id} data={i.responsiveImage} />
      ))}
    </div>
  );
}

function ImageWrapper({ data }) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 10 && rect.bottom > 0) {
        const progress = Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        );
        setTranslateY(-62 * progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={imgRef} className="aspect-[11/15] relative overflow-hidden my-6">
      <SRCImage
        data={data}
        className="absolute inset-0 !max-w-none"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
