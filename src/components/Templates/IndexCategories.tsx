"use client";

import {
  BuildingCategoriesIndexRecord,
  BuildingCategoryRecord,
  SiteLocale,
} from "@/graphql/generated";
import TextHero from "../Hero/TextHero";

interface GenericPageProps {
  page: BuildingCategoriesIndexRecord;
  locale: SiteLocale;
  list: BuildingCategoryRecord[];
}
export default function IndexCategories({
  page,
  locale,
  list,
}: GenericPageProps) {
  return (
    <>
      <TextHero heroTitle={page.title} locale={locale} />
      <BlackSection
        randomPhotos={randomPhotos}
        title={translate("recentPhotos", locale)}
        locale={locale}
      />
    </>
  );
}
