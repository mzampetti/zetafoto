import { FileField, HomepageRecord, SiteLocale } from "@/graphql/generated";
import ButtonBlock from "./ButtonBlock";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SRCImage } from "react-datocms";
import CustomIcon from "./CustomIcon";
import BowBlock from "./BlowBlock";
import ExternalLink from "../Links/ExternalLink";

type BannerProps = {
  title: string;
  text: string;
  locale: SiteLocale;
  page?: HomepageRecord;
  url?: string;
  image?: FileField;
  titleSmall?: boolean;
};

export default function BanneCtaBlock({
  title,
  text,
  locale,
  url,
  image,
  page,
  titleSmall,
}: BannerProps) {
  const imageVariants = {
    offscreen: {
      bottom: "100%",
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
    onscreen: {
      bottom: 0,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };
  const textVariants = {
    offscreen: {
      opacity: 0,
      translateY: 50,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    onscreen: {
      opacity: 100,
      translateY: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

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

  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={variants}
      className="relative mt-24 w-full h-[600px]"
    >
      <SRCImage
        data={image?.responsiveImage}
        className="object-cover object-center !w-full !h-full !max-w-none"
      />
      <div className="z-0 isolate absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full text-center px-6">
        <h2 className="text-xl font-semibold xl:text-2xl">{title}</h2>
        <div
          className="font-light mt-4 text-[18px] xl:text-md xl:py-4"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <div className="flex flex-wrap gap-x-4 justify-center mt-4">
          <ExternalLink url={page.splash1Catalogue1Pdf.url}>
            <ButtonBlock label={page.splash1Cta1Text} />
          </ExternalLink>
          <ExternalLink url={page.splash1Catalogue2Pdf.url}>
            <ButtonBlock label={page.splash1Cta2Text} />
          </ExternalLink>
          <ExternalLink url={page.splash1Catalogue3Pdf.url}>
            <ButtonBlock label={page.splash1Cta3Text} />
          </ExternalLink>
        </div>
      </div>
    </motion.section>
  );
}
