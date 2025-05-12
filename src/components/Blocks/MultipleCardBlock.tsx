"use client";
import { SRCImage } from "react-datocms";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function GalleryBlock({ data, locale }) {
  const scrollRef = useRef(null);

  const containerVariants = {
    offscreen: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0,
        staggerDirection: -1,
      },
    },
    onscreen: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    offscreen: {
      bottom: "100%",
      transition: {
        ease: "easeOut",
        duration: 0.75,
      },
    },
    onscreen: {
      bottom: 0,
      transition: {
        ease: "easeOut",
        duration: 0.75,
      },
    },
  };

  return (
    <div className="container md:px-24 md:gap-y-20 xl:px-0 py-8 md:py-16 lg:py-28">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        ref={scrollRef}
        variants={containerVariants}
      >
        <div
          className={`${
            data.multipleImages.length === 3
              ? "xl:grid-cols-3"
              : "xl:grid-cols-4"
          } xl:w-10/12 xl:mx-auto md:gap-10 px-6 xl:px-0 xl:gap-10 gap-4 grid-cols-6 grid md:grid-cols-2`}
        >
          {data.multipleImages.map((img: any, n: number) => {
            return (
              <div
                key={img.id}
                className={`relative block ${
                  n % 2 === 0
                    ? "col-span-5 md:col-span-1 md:col-start-0"
                    : "md:mt-28 col-span-5 md:col-span-1 col-start-2"
                }`}
              >
                <div className="relative aspect-[2/3] w-full bg-black/10">
                  <motion.div
                    variants={imageVariants}
                    viewport={{ root: scrollRef, once: true, amount: 0.75 }}
                    className={`absolute top-0 overflow-hidden w-full ${
                      n % 2 === 0 ? "" : "col-start-2 "
                    } col-span-5 md:col-span-1 md:col-start-0`}
                  >
                    <SRCImage
                      data={img.imageAsset.responsiveImage}
                      className="object-cover absolute inset-0 w-full h-full"
                    />
                  </motion.div>
                </div>
                <div
                  className="formatted py-6 text-neutral "
                  dangerouslySetInnerHTML={{
                    __html: `${img.imageDescription}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
