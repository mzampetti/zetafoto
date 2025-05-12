"use client";

import {
  HomepageRecord,
  NewsRecord,
  ProductRecord,
  SiteLocale,
} from "@/graphql/generated";
import Carousel from "@/components/Hero/Carousel";
import CardPageBlockHp from "../Blocks/CardProduct";
import CardProduct from "../Blocks/CardProduct";
import BanneCtaBlock from "../Blocks/BannerCtaBlock";
import CardNews from "../Blocks/CardNews";

interface GenericPageProps {
  locale: SiteLocale;
  page: HomepageRecord;
  products: ProductRecord[];
  news: NewsRecord[];
}

export default function HomePage({
  page,
  products,
  news,
  locale,
}: GenericPageProps) {
  return (
    <>
      <Carousel slides={page.sliders} locale={locale} />
      <section className="py-12 container">
        <h2 className="font-bold text-md xl:py-6 2xl:py-12">
          {locale === "it" ? "Prodotti in vetrina" : "Products showcase"}
        </h2>
        <div className="grid gap-8 py-12 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 lg:gap-y-16">
          {products.map((p: ProductRecord, i: number) => (
            <CardProduct key={p.id} locale={locale} product={p} i={i} />
          ))}
        </div>
      </section>
      <BanneCtaBlock
        title={page.splash1Title}
        text={page.splash1Text}
        locale={locale}
        image={page.splash1Image}
        page={page}
      />
      <section className="py-12 container">
        <div className="xl:w-10/12 xl:mx-auto">
          <h2 className="font-bold text-md xl:py-6 2xl:py-12">News</h2>
          <div className="grid gap-8 py-12 md:grid-cols-2 lg:gap-y-16">
            {news.map((n: NewsRecord, i: number) => (
              <CardNews key={n.id} locale={locale} data={n} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
