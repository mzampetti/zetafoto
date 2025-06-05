"use client";

import {
  HomepageRecord,
  SiteLocale,
  FileField,
  PhotoRecord,
} from "@/graphql/generated";
import TextHero from "../Hero/TextHero";
import { SRCImage } from "react-datocms";
import translate from "@/labels";
import BlackSection from "../Sections/BlackSection";

interface GenericPageProps {
  locale: SiteLocale;
  page: HomepageRecord;
  photos: PhotoRecord[];
}
export default function HomePage({ page, locale, photos }: GenericPageProps) {
  const { galleryImages } = page;
  return (
    <>
      <TextHero
        heroTitle={page.title}
        heroText={page.text}
        locale={locale}
        url={locale === "it" ? "/tecnica-biografica" : "/en/about"}
      />
      <section className="py-8 pb-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img: FileField) => (
              <SRCImage key={img.id} data={img.responsiveImage} />
            ))}
          </div>
        </div>
      </section>
      <BlackSection
        items={photos}
        title={translate("recentPhotos", locale)}
        locale={locale}
      />
    </>
  );
}
