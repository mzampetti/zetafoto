"use client";

import {
  ContactPageRecord,
  HomepageRecord,
  SiteLocale,
} from "@/graphql/generated";
import { motion, Variants } from "framer-motion";
import MapBlock from "../Map/MapBlock";
import BackgroundImageHero from "../Hero/BackgroundImage";
import Socials from "../Footer/Socials";
import BanneCtaBlock from "../Blocks/BannerCtaBlock";
import { SRCImage } from "react-datocms";
import { ResponsiveImage } from "../../graphql/generated";
import { BlockList } from "net";
import ExternalLink from "../Links/ExternalLink";
import ButtonBlock from "../Blocks/ButtonBlock";

interface GenericPageProps {
  locale: SiteLocale;
  page: any;
  home: any;
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

export default function LegalPageTmp({ page, home, locale }: GenericPageProps) {
  const { title, text, cover, subtitle, image, blocks } = page;
  return (
    <>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
        className=""
      >
        <BackgroundImageHero
          prefix={locale === "it" ? "normativa" : "legislation"}
          heroTitle={title}
          image={cover}
          locale={locale}
        />
        <div className="pt-28 pb-6 xl:py-32 md:pb-20">
          <div className="container xl:w-10/12 relative">
            <div className="grid gap-8 grid-cols-1">
              <div className="md:flex gap-x-8 items-center">
                <div className="formatted font-light max-w-prose md:w-1/2 xl:text-md">
                  {subtitle && <div className="font-bold mb-4">{subtitle}</div>}
                  {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
                </div>
                {image && (
                  <div className="md:w-1/2 mt-6 xl:pl-20">
                    <SRCImage data={image.responsiveImage} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-16">
              {blocks.map((b: any) => (
                <ExternalLink
                  url={b.attachmentFile.url}
                  className="group block"
                  key={b.id}
                >
                  <div className="bg-secondary text-secondary-content rounded-lg p-6 mt-6 uppercase md:flex md:gap-x-4 items-center justify-between group xl:p-10 xl:pb-14 xl:text-md group-hover:bg-secondary/90 duration-200">
                    <span className="md:mt-4">{b.attachmentTitle}</span>
                    <ButtonBlock
                      label={locale === "it" ? "scarica" : "download"}
                      icon="download"
                    />
                  </div>
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
        <BanneCtaBlock
          title={home.splash1Title}
          text={home.splash1Text}
          locale={locale}
          image={home.splash1Image}
          page={home}
        />
      </motion.div>
    </>
  );
}
