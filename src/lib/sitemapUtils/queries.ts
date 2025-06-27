export const getQuery = (
  key: string
) => `query ${key}($first: IntType, $skip: IntType, $locale: SiteLocale) {
  ${key}(locale: $locale, fallbackLocales: it, first: $first, skip: $skip, filter: {slug: {neq: null}}) {
    slug
  }
}`;
