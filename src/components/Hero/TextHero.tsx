"use client";

import { CategoryRecord, ProductRecord, SiteLocale } from "@/graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";
import { motion, Variants } from "framer-motion";
import DynamicLink from "@/components/Links/DynamicLink";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import { SRCImage } from "react-datocms";
import Link from "next/link";
import CustomIcon from "../Blocks/CustomIcon";
import translate from "@/labels";
import InternalLink from "../Links/InternalLink";
import Dropdown from "../Layout/Dropdwon";
import MapBlock from "../Map/MapBlock";

type Props = {
  heroTitle: string;
  page?: any;
  tmp?: string;
  heroSubtitle?: Maybe<string>;
  link?: Maybe<any> | undefined;
  locale: SiteLocale;
  image?: any;
  cat?: any;
};

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

const TextHero = ({
  heroTitle,
  tmp,
  heroSubtitle,
  image,
  page,
  locale,
  cat,
}: Props) => {
  // const { slug, name } = page;
  const categories = Array.from(
    new Map(
      page?.products?.map((p: ProductRecord) => [p.category.name, p.category])
    ).values()
  );
  const classBreadCrumb =
    "flex gap-2 tracking-wider text-accent max-w-[90%] text-xs lg:text-sm";
  const slugCat =
    cat?.slugs.find((s: any) => s.locale === locale)?.value || "default-slug";

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      className=""
    >
      <div className="pt-28 pb-6 xl:py-44">
        <div className="container xl:w-10/12 relative">
          <div className="grid gap-8 grid-cols-1">
            {(tmp === "category" || tmp === "technique") && (
              <div className={classBreadCrumb}>
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2"
                  href={`/${locale}/${
                    locale === "it" ? "prodotti" : "products"
                  }`}
                  locale={locale}
                  title={locale === "it" ? "Prodotti" : "Products"}
                >
                  {locale === "it" ? "Prodotti" : "Products"}
                </Link>
                <CustomIcon
                  classes="size-6 bg-secondary rotate-180"
                  fileName={"arrow-left"}
                />
                <span className="truncate">{translate(tmp, locale)}</span>
                <span className="truncate block">{page.name}</span>
              </div>
            )}
            {tmp === "product" && (
              <div className={classBreadCrumb}>
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2"
                  href={`/${locale}/${
                    locale === "it" ? "prodotti" : "products"
                  }`}
                  locale={locale}
                  title={locale === "it" ? "Prodotti" : "Products"}
                >
                  {locale === "it" ? "Prodotti" : "Products"}
                </Link>
                <CustomIcon
                  classes="size-6 bg-secondary rotate-180"
                  fileName={"arrow-left"}
                />
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2 truncate"
                  href={`/${locale}/c/${page.category?.slug}`}
                  locale={locale}
                  title={page.category?.name}
                >
                  {page.category?.name}
                </Link>
                <CustomIcon
                  classes="size-6 bg-secondary rotate-180"
                  fileName={"arrow-left"}
                />
                <span className="truncate block">{page.name}</span>
              </div>
            )}
            {tmp === "techniqueFilter" && (
              <div className={classBreadCrumb}>
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2"
                  href={`/${locale}/${
                    locale === "it" ? "prodotti" : "products"
                  }`}
                  locale={locale}
                  title={locale === "it" ? "Prodotti" : "Products"}
                >
                  {locale === "it" ? "Prodotti" : "Products"}
                </Link>
                <CustomIcon
                  classes="size-6 bg-secondary rotate-180"
                  fileName={"arrow-left"}
                />
                <span className="">{translate(tmp, locale)}</span>
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2"
                  href={`/${locale}/t/${page.slug}`}
                  locale={locale}
                  title={page.name}
                >
                  <span className="truncate block">{page.name}</span>
                </Link>
                <CustomIcon
                  classes="size-6 bg-secondary rotate-180"
                  fileName={"arrow-left"}
                />
                <span className="">{translate("category", locale)}</span>
                <Link
                  className="hover:text-primary-content hover:underline underline-offset-2"
                  href={`/${locale}/c/${slugCat}`}
                  locale={locale}
                  title={cat.name}
                >
                  <span className="truncate block">{cat.name}</span>
                </Link>
              </div>
            )}
            {heroTitle && <h1 className="title">{heroTitle}</h1>}
            {heroSubtitle && (
              <div
                dangerouslySetInnerHTML={{ __html: heroSubtitle }}
                className="text font-light max-w-prose"
              />
            )}
            {tmp === "contact" && (
              <MapBlock locale={locale} record={page?.map} />
            )}
            {image && <SRCImage data={image.responsiveImage} />}
            {tmp?.includes("technique") && (
              <Dropdown
                tmp={tmp}
                locale={locale}
                slug={page.slug}
                currentCat={cat?.name}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TextHero;
