"use client";

import { SiteLocale } from "@/graphql/generated";
import BackgroundImageHero from "./BackgroundImage";
import Carousel from "@/components/Hero/Carousel";
import TextHero from "./TextHero";
import ImageTextHero from "./ImageTextHero";

type PropsWhichHero = {
  hero: any;
  locale: SiteLocale;
};

export default function WhichHero({ hero, locale }: PropsWhichHero) {
  switch (hero.displayOptions) {
    case "hero_bg":
      return (
        <BackgroundImageHero
          heroTitle={hero.heroTitle}
          image={hero.heroImage}
          link={hero.link}
          locale={locale}
        />
      );
    case "hero_image_txt":
      return (
        <ImageTextHero
          heroTitle={hero.heroTitle}
          heroSubtitle={hero.heroSubtitle}
          image={hero.heroImage}
          locale={locale}
        />
      );
    case "hero_slider":
      return <Carousel slides={hero.sliders} locale={locale} />;
  }
}
