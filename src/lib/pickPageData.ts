import resolveLink from "./resolveLink";

export function pickHrefs(data: any) {
  const arr: string[] = ["slugs", "_modelApiKey"];
  const pageData: any = Object.fromEntries(
    Object.entries(data).filter(([k]) => arr.includes(k) || "")
  );

  return {
    it: resolveLink({ ...pageData, locale: "it", modelRelated: null }),
    en: resolveLink({ ...pageData, locale: "en", modelRelated: null }),
  };
}
