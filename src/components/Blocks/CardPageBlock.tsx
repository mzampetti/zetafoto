"use client";

import { SRCImage } from "react-datocms";
import { SiteLocale } from "@/graphql/generated";
import InternalLink from "../Links/InternalLink";
import { motion, Variants } from "framer-motion";
import ButtonBlock from "./ButtonBlock";
import Link from "next/link";

type PropsCardPost = {
  locale: SiteLocale;
  data: any;
  i: number;
  titleSmall?: boolean;
};

const variants: Variants = {
  offscreen: { opacity: 0, y: 100 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75 },
  },
};

const CardPageBlock = ({
  data,
  locale,
  i,
  titleSmall = false,
}: PropsCardPost) => {
  const {
    cover,
    title,
    abstract,
    imgCover,
    imgText,
    imgTitle,
    link,
    subtitle,
    _modelApiKey,
  } = data;

  const image = cover || imgCover;
  const titleCard = title || imgTitle;
  const textCard = abstract || imgText;
  const isBlockImageText = _modelApiKey === "block_image_text";

  const renderCard = (showButton: boolean) => (
    <div
      className={`group md:flex ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
    >
      <div className="relative md:w-1/2 md:min-h-[420px] xl:w-[60%]">
        {image ? (
          <SRCImage
            data={image.responsiveImage}
            className={`!max-w-full object-cover md:absolute !h-60 md:!h-full border-b-[7px] border-primary-content md:!w-11/12`}
          />
        ) : (
          <div className="mt-12" />
        )}
        <h2
          className={`${
            i % 2 == 0 ? "right-0" : "left-0"
          } text-md uppercase md:hidden absolute -bottom-2 font-serif px-6 py-2 bg-primary w-[90%]`}
        >
          {titleCard}
        </h2>
      </div>

      <div
        className={`${
          i % 2 == 0 ? "pl-[10%] md:pl-0" : "pr-[10%] md:pr-0"
        } py-8 md:py-0 duration-300 md:w-1/2 xl:w-[40%] md:flex md:flex-wrap md:content-between`}
      >
        <h2
          className={`${
            i % 2 !== 0 ? "" : "md:-translate-x-20 xl:-translate-x-40"
          } text-md lg:text-lg font-serif px-6 uppercase bg-primary md:py-4 md:block hidden relative my-8`}
        >
          {titleCard}
        </h2>

        <div className="grid gap-3">
          <div className="xl:pt-12">
            {subtitle && (
              <h3 className="uppercase font-bold mb-4 xl:mb-6">{subtitle}</h3>
            )}
            {textCard && (
              <div
                dangerouslySetInnerHTML={{ __html: textCard }}
                className={`${i % 2 !== 0 ? "md:mr-12" : ""} text mb-8`}
              />
            )}
            {showButton && (
              <ButtonBlock
                label={locale === "it" ? "Scopri di più" : "Learn more"}
                color="dark"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: Math.min(0.1 * i, 1) }}
      variants={variants}
      className="pt-6 xl:pt-20"
    >
      {isBlockImageText ? (
        link ? (
          <Link href={link} title={titleCard || "Details"}>
            {renderCard(true)}
          </Link>
        ) : (
          renderCard(false)
        )
      ) : (
        <InternalLink
          record={data}
          locale={locale}
          title={titleCard || "Details"}
        >
          {renderCard(true)}
        </InternalLink>
      )}
    </motion.div>
  );
};

export default CardPageBlock;
