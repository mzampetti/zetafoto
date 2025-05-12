"use client";

// import { Image, SRCImage } from "react-datocms";
import Image from "next/image";
import {
  ProductRecord,
  SiteLocale,
  TechniqueRecord,
} from "@/graphql/generated";
import InternalLink from "../Links/InternalLink";

type PropsCardProduct = {
  locale: SiteLocale;
  product: ProductRecord;
  i: number;
};

const CardProduct = ({ product, locale, i }: PropsCardProduct) => {
  const { name, images, category, techniques, description, serial } = product;

  return (
    <div className="pt-6 xl:pt-20">
      <div className="custom-shadow rounded-md bg-white p-2">
        {product.new && (
          <div className="text-center -mt-6">
            <span className="bg-secondary text-white rounder-full uppercase px-8 py-2 text-xs tracking-wider rounded-full mx-auto inline-block">
              {locale === "it" ? "Novità" : "New"}
            </span>
          </div>
        )}
        <InternalLink
          record={product}
          locale={locale}
          title={name}
          className="group"
        >
          <div className="aspect-square relative">
            <Image
              src={images[0].responsiveImage.src}
              alt={name}
              title={name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="tracking-wider mt-4 group-hover:text-accent duration-200 font-semibold px-4">
            {name}
          </h2>
          <div className="text-[#979797] font-medium px-4 mt-2 text-sm">
            {locale === "it" ? "Codice articolo:" : "Product code:"}
            <span className="pl-1 text-primary-content">{serial}</span>
          </div>
          <div
            className="text-sm mt-2 line-clamp-3 px-4 text-black"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </InternalLink>
        <div className="text-[#979797] font-medium px-4 mt-6 text-sm">
          {locale === "it" ? "Categoria:" : "Category:"}
        </div>
        <InternalLink record={category} locale={locale} title={category.name}>
          <div className="hover:text-accent text-black mb-2 px-4 hover:underline underline-offset-2 duration-200 font-medium">
            {category.name}
          </div>
        </InternalLink>
        <div className="text-[#979797] font-medium px-4 mt-2 text-sm">
          {locale === "it" ? "Tecniche:" : "Techniques:"}
        </div>
        <div className="flex gap-1.5 px-4 flex-wrap mb-8 mt-1">
          {techniques.map((t: TechniqueRecord, i: number) => (
            <InternalLink
              className="group"
              locale={locale}
              record={t}
              key={t.id}
            >
              <span className="text-xs bg-secondary/10 text-black group-hover:underline underline-offset-2 rounded-md w-auto px-3 py-1.5 font-medium duration-200 group-hover:bg-secondary/5 truncate whitespace-nowrap">
                {t.name}
              </span>
            </InternalLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
