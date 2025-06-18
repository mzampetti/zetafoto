"use client";

import { SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import translate from "@/labels";
import CustomIcon from "@/components/Blocks/CustomIcon";
import resolveLink from "@/lib/resolveLink";

type Props = {
  lng: SiteLocale;
  languages: SiteLocale[];
  hrefs?: any;
  model: string;
};

const LanguageSelector = ({ lng, languages, hrefs, model }: Props) => {
  const pathname = usePathname();
  return (
    <div className="hidden xl:flex border-l border-[#e0e0e0]">
      {languages.map((locale, i: number) => {
        const fallbackLocale: string = `/${locale}`;
        return (
          <div className="flex items-center" key={locale}>
            <Link
              href={
                hrefs?.[locale] ||
                resolveLink({ _modelApiKey: model, locale: locale }) ||
                fallbackLocale
              }
              className=""
              role="menuitem"
              title={hrefs?.[locale] || fallbackLocale}
            >
              <div
                className={`${
                  locale === lng ? "hidden" : ""
                } inline-flex items-center pl-6 gap-1 duration-200 group font-bold text-md`}
              >
                {translate("locale", locale)}
                <CustomIcon
                  classes="size-4 xl:block bg-secondary -rotate-90 group-hover:translate-x-1 duration-200"
                  fileName="angle_down"
                />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
