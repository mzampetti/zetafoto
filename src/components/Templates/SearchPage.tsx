"use client";

import { SiteLocale } from "@/graphql/generated";
import { InstantSearch, Index, useInstantSearch } from "react-instantsearch";
import { algoliasearch, SearchClient } from "algoliasearch";
import CustomSearchBox from "../Algolia/CustomSearchBox";
import MainSearchResults from "../Algolia/MainSearchSectionWrap";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import qs from "qs";
import CustomIcon from "../Blocks/CustomIcon";
import translate from "@/labels";
import ImageTextHero from "../Hero/ImageTextHero";
import TextHero from "../Hero/TextHero";

type GenericPageProps = {
  locale: SiteLocale;
  data?: any;
};

const searchClient: SearchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
);

function getPageSlug(key: any, locale: string) {
  return key;
  //   if (locale === "it") return key;
  //   return routeTranslations[key][locale] || key;
}

function urlToSearchState(location: any, pageSlug: any, localePrefix: any) {
  // const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);

  const { query = "", page, section = [] } = qs.parse(location.search.slice(1));
  // `qs` does not return an array when there's a single value.
  const allSections = Array.isArray(section)
    ? section
    : [section].filter(Boolean);
  return {
    query: decodeURIComponent(query as string),
    page,
    section: allSections.map((c) => decodeURIComponent(c as string)),
  };
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();
  if (!indexUiState.query) {
    return fallback;
  }
  return children;
}

function SearchSomething({ locale }) {
  return (
    <div className="my-10 max-w-[1024px] lg:mt-6 lg:text-xl">
      {translate("search.something-hint", locale)}
    </div>
  );
}

function NoResults({ locale }) {
  return (
    <div className="mb-10 max-w-[1024px] lg:mt-7 lg:text-xl">
      {translate("search.no-result-hint", locale)}
    </div>
  );
}

const Checkbox = ({ children, name, checked, onChange }) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);
  function handleChange(newValue) {
    onChange(name, newValue);
    setIsChecked(newValue);
  }

  return (
    <>
      <input
        id={name}
        type="checkbox"
        className="checked:bg-border before:bg-white peer mr-2 size-6 appearance-none before:z-[1] before:mr-2 before:block before:size-6 before:shadow-[0_0_0_1px_#000_inset] before:content-[''] checked:before:bg-[url('/assets/check.svg')]"
        defaultChecked={checked}
        onChange={(e) => handleChange(!isChecked)}
      />
      {children}
    </>
  );
};

function Filters({ values, stats, handleChange, locale }) {
  return (
    <div>
      {Object.keys(stats).map((key, idx) => {
        const value = values?.[key] ? true : false;
        return (
          <div key={idx}>
            {stats[key] != 0 && (
              <div className="my-3 flex items-center" key={key}>
                <Checkbox
                  name={key}
                  checked={value}
                  onChange={(name, value) => handleChange(name, value)}
                >
                  <label
                    htmlFor={key}
                    className="cursor-pointer pl-2 font-sans text-sm"
                  >
                    {translate(key, locale)}
                    <span className="ml-1 rounded-md bg-primary px-1.5 py-1 leading-[0]">
                      {stats[key]}
                    </span>
                  </label>
                </Checkbox>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const sections = ["technique", "category", "product"];
const defaultFilters = sections.reduce((acc, s) => {
  return { ...acc, [s]: false };
}, {});

function SearchBody({ querySearched, locale }) {
  const [query, setQuery] = useState(querySearched);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [stats, setStats] = useState({});

  function handleStats(name, value) {
    function getValue(prev, name, value) {
      if (value == 0 && prev[name] && prev[name] > 0) {
        return prev[name];
      } else {
        return value;
      }
    }

    if (name) {
      setStats((prev) => {
        return { ...prev, [name]: getValue(prev, name, value) };
      });
    }
  }

  function handleChangeFilter(name, value) {
    if (name) {
      setFilters((prev) => {
        return { ...prev, [name]: value };
      });
    }
    setOpenFilters(false);
  }

  const filtered = Object.keys(filters).reduce((all, key) => {
    const value = filters[key];
    if (value) {
      return [...all, key];
    }
    return all;
  }, []);
  const list = filtered.length ? filtered : sections;
  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  let count = 0;
  count = Object.keys(stats).reduce((sum, k) => {
    const value = stats[k];
    return sum + value;
  }, 0);

  return (
    <>
      <section className="">
        <h2 className="font-sans text-lg mt-8 lg:text-xl lg:mb-12">
          {!query && <>{translate("search.results", locale)} </>}
          {query && (
            <>
              {translate("search.results-for", locale)}
              <span className="ml-2 uppercase font-bold">{query}</span>
            </>
          )}
        </h2>
        <div className="mt-6 lg:hidden">
          <button
            className="bg-white text-primary-content px-5 py-3 lg:px-8 inline-flex items-center lg:text-md justify-center rounded-full text-center text-xs font-bold motion-safe:duration-200 uppercase tracking-wider"
            onClick={() => handleOpenFilters()}
          >
            <CustomIcon
              fileName="filter"
              classes="size-5 mr-2 bg-primary-content"
            />
            {openFilters
              ? translate("search.hide-filters", locale)
              : querySearched
              ? translate("search.modify-filters", locale)
              : translate("search.label", locale)}
          </button>
        </div>

        <div className="lg:flex lg:justify-between">
          <div
            className={`${
              openFilters
                ? "h-auto opacity-100 motion-safe:duration-500"
                : "h-0 opacity-0 overflow-hidden motion-safe:duration-500"
            } lg:sticky lg:top-28 lg:opacity-100 lg:z-[1] lg:h-full lg:w-1/4 lg:shrink-0 lg:overflow-auto`}
          >
            <div className="">
              <div className="my-6">
                <CustomSearchBox
                  resetNotification={false}
                  locale={locale}
                  section="main"
                  customPlaceholder={translate("search.placeholder", locale)}
                  initialQuery={query || ""}
                  replaceUrl={true}
                />
              </div>

              <EmptyQueryBoundary fallback={<div />}>
                {count !== 0 && (
                  <div className="my-10">
                    <h3 className="text-sm uppercase font-bold tracking-wider lg:text-base">
                      {translate("search.filter-tipology", locale)}
                    </h3>
                    <div className="my-6 pb-6">
                      <Filters
                        stats={stats}
                        values={filters}
                        handleChange={(name, value) =>
                          handleChangeFilter(name, value)
                        }
                        locale={locale}
                      />
                    </div>
                  </div>
                )}
              </EmptyQueryBoundary>
            </div>
          </div>
          <EmptyQueryBoundary fallback={<SearchSomething locale={locale} />}>
            <div className="lg:w-3/4 lg:pl-10">
              {list.map((name) => (
                <div key={name.toLowerCase() + "-index"}>
                  <Index indexName={name + "_" + locale}>
                    <MainSearchResults
                      name={name.toLowerCase()}
                      locale={locale}
                      handleStats={handleStats}
                    />
                  </Index>
                </div>
              ))}
              {count === 0 && <NoResults locale={locale} />}
            </div>
          </EmptyQueryBoundary>
        </div>
      </section>
    </>
  );
}

export default function SearchPage({ data, locale }: GenericPageProps) {
  if (!data) return null;
  const { name, text } = data;

  const pageSlug = getPageSlug("cerca", locale);
  const asPath = usePathname();

  const [querySearched, setQuerySearched] = useState("");

  useEffect(() => {
    const routeState = urlToSearchState(
      location,
      pageSlug,
      locale === "it" ? "" : "en"
    );
    const { query } = routeState;
    if (query) {
      setQuerySearched(`${query}`);
    }
  }, [asPath]);

  return (
    <div>
      <InstantSearch searchClient={searchClient}>
        <div className="relative pt-20 md:py-40 container">
          <SearchBody querySearched={querySearched} locale={locale} />
        </div>
      </InstantSearch>
    </div>
  );
}
