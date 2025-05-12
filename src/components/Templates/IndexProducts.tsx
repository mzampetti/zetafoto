"use client";

import {
  CategoryRecord,
  ProductRecord,
  ProductsPageRecord,
  SiteLocale,
} from "@/graphql/generated";
import TextHero from "../Hero/TextHero";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import CardProduct from "../Blocks/CardProduct";
import Pagination from "../Layout/Pagination";

interface GenericPageProps {
  locale: SiteLocale;
  page: any;
  list: ProductsPageRecord[];
  tmp?: string;
  cat?: CategoryRecord;
}

const variants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

export default function IndexProducts({
  page,
  tmp,
  locale,
  list,
  cat,
}: GenericPageProps) {
  const { title, name } = page;

  const pageSize = 24;
  const [currentPage, setCurrentPage] = useState(0);

  let start = currentPage * pageSize;
  let end = start + pageSize;
  const pageList = list.length > pageSize ? list.slice(start, end) : list;

  return (
    <>
      <TextHero
        page={page}
        heroTitle={title || name}
        locale={locale}
        tmp={tmp}
        cat={cat}
      />
      <section id="targetElement" className="">
        <div className="container">
          <div className="grid gap-8 xl:-mt-32 pb-12 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 lg:gap-y-16">
            {pageList.map((p: any, i: number) => (
              <CardProduct key={p.id} locale={locale} product={p} i={i} />
            ))}
          </div>
        </div>
        <Pagination
          locale={locale}
          pageSize={pageSize}
          totals={list.length}
          currentPage={currentPage}
          handleChangePage={(p: any) => setCurrentPage(p)}
        />
      </section>
    </>
  );
}
