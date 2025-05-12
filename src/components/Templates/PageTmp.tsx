"use client";

import { SiteLocale } from "@/graphql/generated";
import TextHero from "../Hero/TextHero";
import { SRCImage } from "react-datocms";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

export default function PageTmp({ page, locale }: GenericPageProps) {
  const {
    title,
    text,
    image,
    titleProduction,
    imageProduction,
    subtitleProduction,
    textProduction,
    galleryProduction,
    blocks,
  } = page;
  return (
    <>
      <TextHero
        heroTitle={title}
        image={image}
        heroSubtitle={text}
        locale={locale}
      />
      <section className="standard-vertical-p">
        <div className="container xl:w-10/12">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
            className="pb-8 2xl:pb-12"
          >
            <h2 className="title">{titleProduction}</h2>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
            className="pb-8 2xl:pb-12"
          >
            <Image
              src={imageProduction.url}
              alt={"logo"}
              width={141}
              height={43}
            />
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
            className="pb-8 2xl:pb-12"
          >
            <div className="font-semibold text-md">{subtitleProduction}</div>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
            className="pb-8 2xl:pb-12"
          >
            <div
              className="font-light text-sm xl:text-base"
              dangerouslySetInnerHTML={{ __html: textProduction }}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 2xl:gap-12">
            {galleryProduction.map((img: any, i: number) => (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: Math.min(0.1 * i, 1) }}
                variants={variants}
              >
                <SRCImage data={img.responsiveImage} key={img.id} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {blocks.map((b: any, n: number) => (
        <section
          className={`${n % 2 === 0 ? "bg-[#EDF4F7]" : ""} standard-vertical-p`}
          key={b.id}
        >
          <div className="container xl:w-10/12">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={variants}
              className=""
            >
              <h2 className="title pb-8 2xl:pb-12">{b.title}</h2>
            </motion.div>
            {b.text && (
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.1 }}
                variants={variants}
                className="pb-8 2xl:pb-12"
              >
                <div
                  className="font-light text-sm xl:text-base"
                  dangerouslySetInnerHTML={{ __html: b.text }}
                />
              </motion.div>
            )}
            <div className="grid md:grid-cols-2 gap-6 2xl:gap-12">
              {b.image.map((img: any, i: number) => (
                <motion.div
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: Math.min(0.1 * i, 1) }}
                  variants={variants}
                  className={`${
                    i === 0 ? "md:col-span-2 aspect-[9/5]" : "aspect-[9/7]"
                  } relative`}
                >
                  <SRCImage
                    data={img.responsiveImage}
                    key={img.id}
                    className="!w-full !h-full !object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
