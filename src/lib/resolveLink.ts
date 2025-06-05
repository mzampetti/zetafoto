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

function matchCustomRoute({ slugs, _modelApiKey, locale }: RouteProps) {
  const slug = slugs?.find((i) => i.locale === locale)?.value;
  if (!slug) return null;
}

export default function resolveLink({
  _modelApiKey,
  locale,
  slugs = null,
  slug = null,
}: RouteProps): string {
  slug = slugs ? slugs?.find((i) => i.locale === locale)?.value : slug;
  if (slug) {
    const customRoute = matchCustomRoute({
      slugs,
      _modelApiKey,
      locale,
    });
    if (customRoute) {
      return `${locale}${customRoute}`;
    }
  }
  const l = locale === config.defaultLocale ? "" : `/${locale}/`;
  // return _modelApiKey;
  switch (_modelApiKey) {
    case "page":
      if (slug === "home") {
        return `/${l}`;
      } else {
        return `/${l}${slug}`;
      }
    case "building_categories_index":
      return `${l}${translate("buildingCategoriesIndex.slug", locale)}`;
    case "building_category":
      return `${l}${translate("buildingCategoriesIndex.slug", locale)}/${slug}`;
    case "locations_index":
      return `${l}${translate("locationsIndex.slug", locale)}`;
    case "location":
      return `${l}${translate("locationsIndex.slug", locale)}/${slug}`;
    case "cities_index":
      return `${l}${translate("citiesIndex.slug", locale)}`;
    case "city":
      return `${l}${translate("citiesIndex.slug", locale)}/${slug}`;
    case "architectonic_styles_index":
      return `${l}${translate("architectonicStylesIndex.slug", locale)}`;
    case "architectonic_style":
      return `${l}${translate(
        "architectonicStylesIndex.slug",
        locale
      )}/${slug}`;
    case "architectonic_elements_index":
      return `${l}${translate("architectonicElementsIndex.slug", locale)}`;
    case "architectonic_element":
      return `${l}${translate(
        "architectonicElementsIndex.slug",
        locale
      )}/${slug}`;
    case "authors_index":
      return `${l}${translate("authorsIndex.slug", locale)}`;
    case "author":
      return `${l}${translate("authorsIndex.slug", locale)}/${slug}`;
    case "photos_collections_index":
      return `${l}${translate("photosCollectionsIndex.slug", locale)}`;
    case "photos_collection":
      return `${l}${translate("photosCollectionsIndex.slug", locale)}/${slug}`;
    case "videos_index":
      return `${l}${translate("videosIndex.slug", locale)}`;
    case "video":
      return `${l}${translate("videosIndex.slug", locale)}/${slug}`;
    case "expositions_index":
      return `${l}${translate("expositionsIndex.slug", locale)}`;
    case "exposition":
      return `${l}${translate("expositionsIndex.slug", locale)}/${slug}`;
    case "articles_index":
      return `${l}news`;
    case "article":
      return `${l}news/${slug}`;
    case "about_page":
      return `${l}${translate("aboutPage.slug", locale)}`;
    case "category":
      return `${l}/c/${slug}`;
    case "photo":
      return `/${l}f/${slug}`;
    default:
      return `${l}${slug ? slug : ""}`;
  }
}
