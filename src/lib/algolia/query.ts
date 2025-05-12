const common = `
   _modelApiKey
   id
   slug
   description
   slugs: _allSlugLocales {
      value
      locale
   }
   name
   `;

export const mainQuery = {
  product: `query allProducts($first: IntType, $skip: IntType, $locale: SiteLocale) {
      product:allProducts(locale: $locale, filter: { slug: { neq: null } }, first: $first, skip: $skip) {
         ${common}
         serial
         variantContainer {
            code
         }
         images {
            responsiveImage {
               src
            }
         }
      }
   }`,
  technique: `query allTechniques($first: IntType, $skip: IntType, $locale: SiteLocale) {
      technique:allTechniques(locale: $locale, filter: { slug: { neq: null } }, first: $first, skip: $skip) {
         ${common}
      }
   }`,
  category: `query allCategories($first: IntType, $skip: IntType, $locale: SiteLocale) {
      category:allCategories(locale: $locale, filter: { slug: { neq: null } }, first: $first, skip: $skip) {
         ${common}
      }
   }`,
};
