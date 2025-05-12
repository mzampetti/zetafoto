"use client";
import { CollectionMetadata } from "@/graphql/generated";
import CardProductBlock from "../Blocks/CardProductBlock";
import Pagination from "../Layout/Pagination";
import { useState } from "react";

type Props = {
  data: any[];
  locale: any;
  postMeta?: CollectionMetadata;
};

const ProductGridRenderer = ({ data, locale }: Props) => {
  const pageSize = 100;
  const [currentPage, setCurrentPage] = useState(0);

  let start = currentPage * pageSize;
  let end = start + pageSize;
  const pageList = data.length > pageSize ? data.slice(start, end) : data;

  return (
    <section className="container px-6 max-w-auto py-12 md:py-20">
      <div
        id="targetElement"
        className="grid gap-6 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:gap-10 scroll-mt-32"
      >
        {pageList.map((product, i: number) => (
          <CardProductBlock
            key={product.id}
            data={product as any}
            locale={locale}
            i={i}
          />
        ))}
      </div>
      <Pagination
        locale={locale}
        pageSize={pageSize}
        totals={data.length}
        currentPage={currentPage}
        handleChangePage={(p: any) => setCurrentPage(p)}
      />
    </section>
  );
};

export default ProductGridRenderer;
