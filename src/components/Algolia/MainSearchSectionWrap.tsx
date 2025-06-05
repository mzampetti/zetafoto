import { Configure, Index, useInstantSearch } from "react-instantsearch";
import { UseHitsProps, useHits } from "react-instantsearch";
import Link from "next/link";
import resolveLink, { t } from "@/lib/resolveLink";
import SharedPagination from "./SharedPagination";
import { useEffect } from "react";
import translate from "@/labels";
import CardPageBlock from "../Blocks/CardPageBlock";
import CardGeneric from "../Blocks/CardGeneric";
import InternalLink from "../Links/InternalLink";
import { motion } from "framer-motion";
// import StandardCard from "components/blocks/cards/StandardCard";
import CustomIcon from "@/components/Blocks/CustomIcon";
import Image from "next/image";

const HITS_PER_PAGE = 50;
export default function MainSearchResults({ locale, name, ...props }) {
  const { hits } = useHits();
  const { results } = useInstantSearch();
  // const cn = "sm:gap-y-10  xl:gap-y-10";
  useEffect(() => {
    if (props.handleStats) {
      props.handleStats(name, results?.nbHits || 0);
    }
  }, [results]);
  if (!hits || hits.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 lg:mt-5">
      <div className="my-5 lg:mt-0 font-serif text-lg font-bold lg:mb-12">
        {translate(name, locale)}
      </div>
      <div className="pb-10">
        <Configure hitsPerPage={HITS_PER_PAGE} />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 overflow-hidden">
          {hits.map((hit: any, i: number) => {
            return (
              <div className="mb-12" key={"hits_" + i}>
                <CardGeneric locale={locale} data={hit} key={hit.id} variant />
              </div>
            );
          })}
        </div>
      </div>
      {results?.nbHits > HITS_PER_PAGE && (
        <div className="w-full py-10 ">
          <SharedPagination
            locale={locale}
            isMainSearch={true}
            resLength={results?.nbHits}
          />
        </div>
      )}
    </div>
  );
}
