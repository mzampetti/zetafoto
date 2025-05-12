import { SiteLocale } from "@/graphql/generated";

type ModelType = string;
type LanguageType = SiteLocale;

type ModelInfo = {
  color: string;
  label: Record<LanguageType, string>;
  indexCta: Record<string, string>;
  indexSlug: Record<string, string>;
};

const modelInfoMap: Record<string, ModelInfo> = {
  article: {
    color: "neutral",
    label: {
      it: "Articoli",
      en: "News",
    },
    indexCta: {
      it: "Vedi tutti le news",
      en: "Read all news",
    },
    indexSlug: {
      it: "/it/cultura/eventi-cultura-tessile/",
      en: "/en/culture/events-textile-culture/",
    },
  },
  course: {
    color: "info",
    label: {
      it: "Corsi",
      en: "Courses",
    },
    indexCta: {
      it: "Vedi tutti i corsi",
      en: "Show all Courses",
    },
    indexSlug: {
      it: "/it/didattica/corsi-calendario/",
      en: "/en/education/scheduled-courses/",
    },
  },
  teacher: {
    color: "info",
    label: {
      it: "Docenti",
      en: "Teachers",
    },
    indexCta: {
      it: "Vedi tutti i docenti",
      en: "Show all Teachers",
    },
    indexSlug: {
      it: "/it/didattica/docenti",
      en: "/en/education/tearchers",
    },
  },
  creation: {
    color: "warning",
    label: {
      it: "Collaborazioni",
      en: "Collaborations",
    },
    indexCta: {
      it: "Vedi tutte le collaborazioni",
      en: "Show all collaborations",
    },
    indexSlug: {
      it: "/it/manifattura/i-nostri-lavori/",
      en: "/",
    },
  },
  magazine: {
    color: "success",
    label: {
      it: "Jacquard",
      en: "Jacquard",
    },
    indexCta: {
      it: "Vedi tutti gli articoli di Jacquard",
      en: "Read all articles from Jacquard",
    },
    indexSlug: {
      it: "/it/cultura/rivista-jacquard/articoli-della-rivista/",
      en: "/en/culture/jacquard-magazine/articles-magazine/",
    },
  },
};

export function getInfoFromModel(
  model: ModelType | string,
  locale: SiteLocale
): {
  color: string;
  label: string;
} {
  const modelInfo = modelInfoMap[model] || { color: "color", label: {} };
  const label = modelInfo.label[locale];

  return { color: modelInfo.color, label };
}

export function getIndexLinks(
  locale: SiteLocale
): { url: string; label: string }[] {
  return Object.values(modelInfoMap).map((model) => ({
    url: model.indexSlug[locale],
    label: model.indexCta[locale],
    color: model.color,
  }));
}
