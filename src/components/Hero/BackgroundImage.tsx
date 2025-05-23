"use client";

import { SiteLocale } from "@/graphql/generated";
import { SRCImage } from "react-datocms";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  heroTitle: string;
  prefix?: string;
  image: any;
  locale: SiteLocale;
  link?: string;
  post?: boolean;
};

const BackgroundImageHero = ({ heroTitle, image, prefix, post }: Props) => {
  return (
    <section className="h-[30vh] w-full relative object-cover overflow-hidden lg:h-[50vh] xl:h-[50vh] flex items-center justify-center">
      <div className="to-black/70 bg-gradient-to-t from-transparent absolute inset-0 h-[200px] z-10" />
      <div className="to-black/70 bg-gradient-to-b from-transparent absolute bottom-0 top-auto left-0 right-0 h-[400px] z-10" />
      <div className="absolute inset-0 -z-0">
        <SRCImage
          data={image?.responsiveImage}
          className="object-cover object-center !w-full !h-full !max-w-none"
          priority={true}
        />
      </div>
      <div className="absolute bottom-6 uppercase container font-sans block mx-auto z-10 text-white lg:pb-8">
        {prefix && (
          <div className="opacity-80 mb-2 xl:text-lg xl:mb-6">{prefix}</div>
        )}
        {heroTitle && !post && (
          <h1 className=" font-bold tracking-wider lg:bottom-20 text-lg lg:text-xl xl:w-10/12">
            {heroTitle}
          </h1>
        )}
      </div>
    </section>
  );
};

export default BackgroundImageHero;
