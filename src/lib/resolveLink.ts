import config from "@/data/config";
import { SiteLocale } from "@/graphql/generated";
import translate from "@/labels";

type RouteProps = {
  _modelApiKey: string;
  locale: SiteLocale;
  slugs?: [
    {
      locale: string;
      value: string;
    }
  ];
  slug?: string | null;
};

export function t(section: string, locale: string) {
  if (locale === config.defaultLocale) return section;
  const key = (config.translations as any)[section];
  return key?.[locale] ?? section;
}

function buildUrl(parts: (string | null | undefined)[]): string {
  return (
    "/" +
    parts
      .filter(Boolean)
      .map((part) => part!.replace(/^\/|\/$/g, ""))
      .join("/")
  );
}

function matchCustomRoute({ slugs, _modelApiKey, locale }: RouteProps) {
  const slug = slugs?.find((i) => i.locale === locale)?.value;
  if (!slug) return null;
  return null;
}

// Funzione principale per risolvere i link
export default function resolveLink({
  _modelApiKey,
  locale,
  slugs = null,
  slug = null,
}: RouteProps): string {
  slug = slugs ? slugs?.find((i) => i.locale === locale)?.value : slug;
  const lang = locale === config.defaultLocale ? null : locale;

  const customRoute = matchCustomRoute({ slugs, _modelApiKey, locale });
  if (customRoute) {
    return buildUrl([lang, customRoute]);
  }

  switch (_modelApiKey) {
    case "page":
      return slug === "home" ? buildUrl([lang]) : buildUrl([lang, slug]);

    case "building_categories_index":
      return buildUrl([
        lang,
        translate("buildingCategoriesIndex.slug", locale),
      ]);
    case "building_category":
      return buildUrl([
        lang,
        translate("buildingCategoriesIndex.slug", locale),
        slug,
      ]);

    case "locations_index":
      return buildUrl([lang, translate("locationsIndex.slug", locale)]);
    case "location":
      return buildUrl([lang, translate("locationsIndex.slug", locale), slug]);

    case "cities_index":
      return buildUrl([lang, translate("citiesIndex.slug", locale)]);
    case "city":
      return buildUrl([lang, translate("citiesIndex.slug", locale), slug]);

    case "architectonic_styles_index":
      return buildUrl([
        lang,
        translate("architectonicStylesIndex.slug", locale),
      ]);
    case "architectonic_style":
      return buildUrl([
        lang,
        translate("architectonicStylesIndex.slug", locale),
        slug,
      ]);

    case "architectonic_elements_index":
      return buildUrl([
        lang,
        translate("architectonicElementsIndex.slug", locale),
      ]);
    case "architectonic_element":
      return buildUrl([
        lang,
        translate("architectonicElementsIndex.slug", locale),
        slug,
      ]);

    case "authors_index":
      return buildUrl([lang, translate("authorsIndex.slug", locale)]);
    case "author":
      return buildUrl([lang, translate("authorsIndex.slug", locale), slug]);

    case "photos_collections_index":
      return buildUrl([lang, translate("photosCollectionsIndex.slug", locale)]);
    case "photos_collection":
      return buildUrl([
        lang,
        translate("photosCollectionsIndex.slug", locale),
        slug,
      ]);

    case "videos_index":
      return buildUrl([lang, translate("videosIndex.slug", locale)]);
    case "video":
      return buildUrl([lang, translate("videosIndex.slug", locale), slug]);

    case "expositions_index":
      return buildUrl([lang, translate("expositionsIndex.slug", locale)]);
    case "exposition":
      return buildUrl([lang, translate("expositionsIndex.slug", locale), slug]);

    case "articles_index":
      return buildUrl([lang, "news"]);
    case "article":
      return buildUrl([lang, "news", slug]);

    case "about_page":
      return buildUrl([lang, translate("aboutPage.slug", locale)]);

    case "category":
      return buildUrl([lang, "c", slug]);

    case "photo":
      return buildUrl([lang, "f", slug]);

    default:
      return buildUrl([lang, slug]);
  }
}
