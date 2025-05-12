import config from "@/data/config";

type RouteProps = {
  _modelApiKey: string;
  locale: string;
  slugs?: [
    {
      locale: string;
      value: string;
    }
  ];
  slug?: string | null;
  modelRelated: string | null;
};

export function t(section: string, locale: string) {
  if (locale === config.defaultLocale) return section;
  const key = (config.translations as any)[section];
  return key?.[locale] ?? section;
}

// function matchCustomRoute({ slugs, _modelApiKey, locale }: RouteProps) {
//   const slug = slugs?.find((i) => i.locale === locale)?.value;
//   if (!slug) return null;
// }

export default function resolveLink({
  slugs,
  _modelApiKey,
  locale,
  slug,
  modelRelated = null,
}: RouteProps): string {
  const l = locale ? `/${locale}` : "";

  switch (_modelApiKey) {
    case "page":
      if (slug === "home") {
        return `/${l}`;
      } else {
        return `/${l}${slug}`;
      }
    case "blog_post":
      return `${l}magazine/${slug}`;
    case "product":
      return `${l}/p/${slug}`;
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
