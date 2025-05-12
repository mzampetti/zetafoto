import { promises as fsPromises } from "fs";
import { fetchData } from "./utils";

const query = `query RoutesQuery {
  _site{
    locales
  }
  routes: allRouteItems(filter: { parent: { exists: false } }) {
    ...routeItemFrag
    children {
      ...routeItemFrag
      children {
        ...routeItemFrag
        children {
          ...routeItemFrag
        }
      }
    }
  }
}

fragment routeItemFrag on RouteItemRecord {
  parent {
    title
    _allTitleLocales {
      locale
      value
    }
    reference {
      __typename
      ... on PageRecord {
        isIndex
        indexModel
        _modelApiKey
        _allSlugLocales {
          locale
          value
        }
      }
      ... on PostRecord {
        _modelApiKey
        _allSlugLocales {
          locale
          value
        }
      }
      ... on ProductRecord {
        _modelApiKey
        _allSlugLocales {
          locale
          value
        }
      }
      ... on TagRecord {
        _modelApiKey
        _allSlugLocales {
          locale
          value
        }
      }
    }
  }
  id
  _modelApiKey
  _allTitleLocales {
    locale
    value
  }
  isHome
  isDynamic
  associatedModel
  reference {
    __typename
    ... on PageRecord {
      isIndex
      indexModel
      _modelApiKey
      _allSlugLocales {
        locale
        value
      }
    }
    ... on PostRecord {
      _modelApiKey
      _allSlugLocales {
        locale
        value
      }
    }
    ... on ProductRecord {
      _modelApiKey
      _allSlugLocales {
        locale
        value
      }
    }
    ... on TagRecord {
      _modelApiKey
      _allSlugLocales {
        locale
        value
      }
    }
  }
}`;

function format(titles: any, defaultLocale: string) {
  const key = titles.find((i: any) => i.locale === defaultLocale).value;
  const rest = titles; //.filter((i: any) => i.locale !== defaultLocale);
  let obj = {};
  if (rest.length <= 0) return null;
  for (let i of rest) {
    obj = { ...obj, [i.locale]: i.value };
  }
  return { [key]: obj };
}

type localizedValue = {
  locale: string;
  value: string;
};

function mergeSlugs(
  labels: localizedValue[],
  slugs: localizedValue[],
  defaultLocale: string
) {
  const label = labels.find((i: any) => i.locale === defaultLocale);
  const slug = slugs.find((i: any) => i.locale === defaultLocale);

  const otherLabels = labels.filter((i: any) => i.locale !== defaultLocale);
  const otherSlugs = slugs.filter((i: any) => i.locale !== defaultLocale);

  let defaultLang = slug ? slug : label;
  let ohters = otherLabels.map((i: any) => {
    let selected = otherSlugs.find((j: any) => j.locale === i.locale);
    if (!selected) {
      selected = otherLabels.find((j: any) => j.locale === i.locale);
    }
    return selected;
  });
  return [defaultLang, ...ohters];
}

function getSlugs(route: any, defaultLocale: string) {
  let slugs = route._allTitleLocales;
  if (route.reference) {
    // slugs = mergeSlugs(
    //   route._allTitleLocales,
    //   route.reference._allSlugLocales,
    //   defaultLocale
    // );
    slugs = route.reference._allSlugLocales;
  }
  return slugs;
}

function getTranslations(routes: any, defaultLocale: string) {
  let translations: any = [];

  function traverse(sibiling: any, level: number) {
    console.log("processing level:", level);
    for (let route of sibiling) {
      if (!(route.isHome || route.isDynamic)) {
        const slugs = getSlugs(route, defaultLocale);
        const obj = format(slugs, defaultLocale);
        if (obj) {
          translations.push(obj);
        }
      }
      if (route.children?.length > 0) {
        traverse(route.children, level + 1);
      }
    }
  }
  traverse(routes, 0);
  return translations;
}
function camelize(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
function formatRoute(route: any, defaultLocale: string) {
  // const english = "en";
  // console.log("formatRoute");
  const slugs = getSlugs(route, defaultLocale);
  const slug = slugs?.find((i: any) => i.locale === defaultLocale)?.value;
  let querySlug = slug ? slug : "";

  const { isHome, isDynamic, associatedModel: model, parent } = route;
  if (isHome) {
    querySlug = "home";
  }

  let m = model;
  let tagRef = "";

  if (model.indexOf("tag-") !== -1) {
    m = "tag";
    tagRef = model.split("-")[1];
  }

  querySlug = querySlug ? camelize(querySlug) : querySlug;
  if (!model || model === "none") {
    querySlug = "";
  }

  const isIndex = route?.reference?.isIndex || false;
  const indexModel = route?.reference?.indexModel || "";
  const isVirtual = !model || model === "none" ? true : false;
  const info = {
    model: m,
    tagRef,
    querySlug,
    indexModel,
    isHome,
    isVirtual,
    isDynamic,
    isIndex,
  };
  if (!querySlug) {
    console.log("info", info);
  }
  return info;
}

function getPaths(routes: any, defaultLocale: string) {
  let paths: string[] = [];
  let models: {
    path: string;
    routeInfo: any;
    slugs: object;
  }[] = [];
  function traverse(sibiling: any, level: number, path: string) {
    console.log("processing level:", level, path);
    for (let route of sibiling) {
      let names = getSlugs(route, defaultLocale);

      let defautSlug = names?.find((i: any) => i.locale === defaultLocale)?.value;

      if (defautSlug === "home") {
        defautSlug = "";
      }
      if (route.isDynamic) {
        defautSlug = `[${defautSlug}]`;
      }
      const newPath = `${path}/${defautSlug}`;
      const routeInfo = formatRoute(route, defaultLocale);

      if (route.children?.length > 0) {
        //recurse
        traverse(route.children, level + 1, newPath);
      }
      if (route.associatedModel) {
        paths.push(newPath);
        let slugs: any = {};
        if (!routeInfo.isDynamic) {
          slugs = names.reduce((obj: any, i: any) => {
            return { ...obj, [i.locale]: i.value };
          }, {});
        }
        models.push({ path: newPath, routeInfo, slugs });
      }
    }
  }
  traverse(routes, 0, "");
  return { paths, models };
}

(async () => {
  const start = Date.now();
  const { routes, _site } = await fetchData(query);
  const { locales } = _site;
  const defaultLocale = locales[0];
  //get translations, uniq and only folders, no home , no slug
  const routeNames = getTranslations(routes, defaultLocale);
  // console.log(routeNames);

  const keys = routeNames.map((i: any) => Object.keys(i)[0]).sort();
  const keySet: any = new Set(keys);
  const translations: any = [];
  keySet.forEach((k: any) => {
    const found = routeNames.find((o: any) => {
      if (Object.keys(o)[0] === k) {
        return true;
      }
      return false;
    });
    // console.log(k, found);
    translations.push(found);
  });
  //array to object
  const translationObj = translations.reduce((obj: any, i: any) => {
    return { ...obj, ...i };
  }, {});

  const { paths, models } = getPaths(routes, defaultLocale);

  const config = {
    defaultLocale,
    locales,
    translations: translationObj,
    paths,
    models,
  };

  const filePath = "./src/data/config.json";
  await fsPromises.writeFile(filePath, JSON.stringify(config, null, 2));

  const elapsed = Date.now() - start;
  console.info("ELAPSED", elapsed / 1000, "seconds");
})();
