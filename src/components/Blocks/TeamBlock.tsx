"use client";
import { motion, Variants } from "framer-motion";
import { SRCImage } from "react-datocms";
import { SiteLocale } from "@/graphql/generated";

interface TeamBlockProps {
  content: any;
  locale: SiteLocale;
  variant?: Boolean;
  i: number;
}

export default function TeamBlock({
  content,
  locale,
  variant,
  i,
}: TeamBlockProps) {
  const { name, subtitle, image, description } = content;

  return variant ? (
    <div
      className={`${
        i === 1 ? "lg:mt-28" : i === 4 ? "lg:mt-28" : ""
      } w-full bg-secondary text-secondary-content lg:px-10`}
    >
      <SRCImage data={image.responsiveImage} />
      <div className="grid gap-2">
        <div className="uppercase font-sans xl:text-lg text-md py-2 border-b border-black/10">
          {name}
        </div>
        <div className="tracking-widest pt-1 font-sans text-base xl:text-md xl:mb-8">
          {subtitle}
        </div>
        <div
          className="font-sans mt-2 xl:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  ) : (
    <div
      className={`${
        i % 2 !== 0 ? "md:flex-row-reverse" : ""
      } w-full bg-secondary text-secondary-content md:flex md:gap-8 items-start lg:gap-3`}
    >
      <SRCImage data={image.responsiveImage} className="md:w-1/2" />
      <div
        className={`${
          i % 2 !== 0 ? "lg:pr-16" : "lg:pl-16"
        } grid gap-2 md:w-1/2 md:flex-none md:-mt-3`}
      >
        <div className="uppercase font-sans text-md xl:text-lg py-2 border-b border-black/10">
          {name}
        </div>
        <div className="tracking-widest pt-1 font-sans text-base xl:text-md xl:mb-8">
          {subtitle}
        </div>
        <div
          className="font-sans mt-2 xl:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
