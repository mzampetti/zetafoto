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
  const l = locale === config.defaultLocale ? "" : `/${locale}`;

  switch (_modelApiKey) {
    case "page":
      if (slug === "home") {
        return `/${l}`;
      } else {
        return `/${l}${slug}`;
      }
    case "blog_post":
      return `${l}magazine/${slug}`;
    case "building_categories_index":
      return `${l}${translate("buildingCategoriesIndex.slug", locale)}`;
    case "locations_index":
      return `${l}${translate("locationsIndex.slug", locale)}`;
    case "cities_index":
      return `${l}${translate("citiesIndex.slug", locale)}`;
    case "architectonic_styles_index":
      return `${l}${translate("architectonicStylesIndex.slug", locale)}`;
    case "architectonic_elements_index":
      return `${l}${translate("architectonicElementsIndex.slug", locale)}`;
    case "authors_index":
      return `${l}${translate("authorsIndex.slug", locale)}`;
    case "photos_collections_index":
      return `${l}${translate("photosCollectionsIndex.slug", locale)}`;
    case "videos_index":
      return `${l}${translate("videosIndex.slug", locale)}`;
    case "expositions_index":
      return `${l}${translate("expositionsIndex.slug", locale)}`;
    case "articles_index":
      return `${l}${translate("articlesIndex.slug", locale)}`;
    case "about_page":
      return `${l}${translate("aboutPage.slug", locale)}`;
    case "category":
      return `${l}/c/${slug}`;
    case "legislation_page":
      return `${l}/l/${slug}`;
    case "technique":
      return `${l}/t/${slug}`;
    default:
      return `${l}${slug ? slug : ""}`;
  }
}
