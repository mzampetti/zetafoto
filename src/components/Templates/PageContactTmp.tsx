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

interface GenericPageProps {
  locale: SiteLocale;
  page: ContactPageRecord;
  home: HomepageRecord;
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

export default function PageTmp({ page, home, locale }: GenericPageProps) {
  const { title, text, cover } = page;
  return (
    <>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
        className=""
      >
        <BackgroundImageHero heroTitle={title} image={cover} locale={locale} />
        <div className="pt-28 pb-6 xl:py-32 md:pb-20">
          <div className="container xl:w-10/12 relative">
            <div className="grid gap-8 grid-cols-1">
              <div className="md:flex gap-x-8">
                {text && (
                  <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    className="formatted font-light max-w-prose md:w-1/2"
                  />
                )}
                <div className="md:w-1/2">
                  <div className="formatted">
                    <strong>
                      <p className="mb-3">
                        {locale === "it" ? "Seguici sui social" : "Follow us"}
                      </p>
                    </strong>
                    <Socials locale={locale} variant color="blue" />
                  </div>
                </div>
              </div>
            </div>
            <MapBlock locale={locale} record={page?.map} />
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
