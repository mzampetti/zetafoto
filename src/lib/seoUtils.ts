import { toNextMetadata } from "react-datocms";
import { LocaleValue, PageSeoProps } from "@/_types";
import resolveLink from "@/lib/resolveLink";
import config from "@/data/config";

const HOST = process.env.HOST;

export function getAlts(page: PageSeoProps) {
  if (!page) return [];
  const alts = page?.slugs?.map((item: LocaleValue) => {
    const { locale } = item;
    const _modelApiKey = page?._modelApiKey || "";
    return { slugs: page?.slugs, locale, _modelApiKey };
  });
  return alts;
}

export default function getSeoMeta(page: PageSeoProps, currentLocale: string) {
  if (!page) return null;

  const tags = page?.seo || [];
  const alts = getAlts(page);

  const nextTags = toNextMetadata(tags || []);
  const dl = config.defaultLocale;

  const alternates = alts?.reduce((obj: any, alt: any) => {
    const path = resolveLink(alt);
    const url = `${HOST}${path}`;
    const { locale } = alt;
    let languages = obj.languages || {};

    //ADD language to ALTERNATES
    obj = {
      ...obj,
      languages: {
        ...languages,
        [locale]: url,
      },
    };
    languages = obj.languages || {};

    //X-DEFAULT
    if (dl === locale) {
      obj = {
        ...obj,
        languages: {
          ...languages,
          ["x-default"]: url,
        },
      };
    }
    //CANONICAL
    if (currentLocale === locale) {
      obj = {
        ...obj,
        canonical: url,
      };
    }

    return obj;
  }, {});
  const meta = { ...nextTags, alternates };
  // console.log(meta);
  return meta;
}
