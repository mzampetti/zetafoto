"use client";

import { SiteLocale } from "@/graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";
import { SRCImage } from "react-datocms";
import { motion, Variants } from "framer-motion";
// import BowBlock from "../Blocks/BlowBlock";
import CustomIcon from "@/components/Blocks/CustomIcon";

type Props = {
  heroTitle: string;
  heroSubtitle: Maybe<string>;
  image?: any;
  locale: SiteLocale;
  prefix?: string;
  date?: string;
  endDate?: string;
};

const variants: Variants = {
  offscreen: {
    y: 100,
  },
  onscreen: {
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

const ImageTextHero = ({
  heroTitle,
  heroSubtitle,
  image,
  locale,
  prefix,
  date,
  endDate,
}: Props) => {
  return image ? (
    <>
      <div className="relative border-b-8 border-secondary isolate">
        <SRCImage
          className="!aspect-[3/2] md:!aspect-video w-full object-cover max-h-[650px] !max-w-none 3xl:max-h-[850px]"
          data={image.responsiveImage}
        />
        <div className="bg-secondary/60 absolute inset-0 z-10" />
      </div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={variants}
      >
        <div className="relative z-20 mx-auto container -mt-36 md:-mt-64 lg:-mt-96 md:w-[80%] max-w-[850px] ">
          {/* <BowBlock
            title={heroTitle}
            text={heroSubtitle}
            locale={locale}
            prefix={prefix}
            date={date}
            endDate={endDate}
          /> */}
        </div>
      </motion.div>
    </>
  ) : (
    <>
      <div className="relative bg-[#323C7C] pt-40 overflow-hidden">
        <CustomIcon
          fileName="logo"
          classes="bg-secondary w-[200px] xl:w-[600px] xl:-left-[300px] md:-left-[200px] md:w-[400px] top-20 -left-[100px] aspect-square absolute top-0 opacity-50"
        />
        <CustomIcon
          fileName="logo"
          classes="bg-secondary w-[200px] xl:w-[600px] xl:-right-[300px] md:-right-[200px] md:w-[400px] top-20 -right-[100px] aspect-square absolute top-0 opacity-50"
        />
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={variants}
        >
          {/* <div className="relative z-10 isolate mx-auto container md:w-[80%] max-w-[850px]">
            <BowBlock
              title={heroTitle}
              text={heroSubtitle}
              locale={locale}
              prefix={prefix}
            />
          </div> */}
        </motion.div>
      </div>
    </>
  );
};

export default ImageTextHero;
