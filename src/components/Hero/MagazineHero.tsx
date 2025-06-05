"use client";

import { SiteLocale } from "@/graphql/generated";
import { Variants } from "framer-motion";
import { SRCImage } from "react-datocms";
import CustomIcon from "@/components/Blocks/CustomIcon";
import ButtonBlock from "@/components/Blocks/ButtonBlock";

type Props = {
  data: any;
  locale: SiteLocale;
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

const MagazineHero = ({ data, locale }: Props) => {
  const { title, abstract, cover, price, _modelApiKey } = data;
  return (
    <div className="relative bg-base-300 text-secondary-content pt-24 overflow-hidden">
      <CustomIcon
        fileName="logo"
        classes="bg-secondary w-[200px] xl:w-[600px] xl:-right-[300px] md:-right-[200px] md:w-[400px] top-20 -right-[100px] aspect-square absolute top-0 opacity-50"
      />
      <div className="container md:pt-24">
        <div className="md:grid md:grid-cols-12 md:gap-4 items-start">
          <div className="grid gap-4 pb-12 md:col-span-7 lg:pr-12">
            <div className="uppercase text-accent">{_modelApiKey}</div>
            {title && (
              <h1 className="text-md font-light md:text-xl font-serif lg:text-lg">
                {title}
              </h1>
            )}
            {abstract && (
              <div
                dangerouslySetInnerHTML={{ __html: abstract }}
                className="text"
              />
            )}
            <div className="text-md">€ {price},00</div>
            <div className="inline-block group cursor-pointer">
              <ButtonBlock
                label={locale == "it" ? "Aggiungi al carrello" : "Add to cart"}
                color="white"
                icon="cart"
              />
            </div>
          </div>
          <div className="md:col-span-5 flex items-center relative bg-secondary text-secondary-content pt-20 pb-10 rounded-t-full mx-auto z-10 xl:-mt-20 lg:pb-20 lg:pt-32 md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
            <SRCImage
              className="!w-[65%] mx-auto"
              data={cover.responsiveImage}
            />
          </div>
        </div>
      </div>
      <div className="border-t-[8px] md:h-12 border-secondary bg-primary h-36 absolute left-0 right-0 bottom-0 z-0 lg:border-t-[16px] lg:h-52" />
    </div>
  );
};

export default MagazineHero;
