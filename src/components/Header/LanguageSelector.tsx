"use client";

import { SiteLocale } from "@/graphql/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import translate from "@/labels";

type Props = {
  lng: SiteLocale;
  languages: SiteLocale[];
  sticky: Boolean;
  navbarOpen: Boolean;
  isDropdownOpen: Boolean;
  hrefs?: any;
};

const LanguageSelector = ({
  lng,
  languages,
  hrefs,
  sticky,
  navbarOpen,
  isDropdownOpen,
}: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex mt-3 xl:px-6 xl:-mt-2 xl:pl-12 xl:pr-0">
      {languages.map((locale, i: number) => {
        const fallbackLocale: string = `/${locale}`;
        return (
          <div className="flex items-center" key={locale}>
            <Link
              href={hrefs?.[locale] || fallbackLocale}
              className=""
              role="menuitem"
              title={hrefs?.[locale] || fallbackLocale}
            >
              <div
                className={`${
                  locale === lng ? "hidden" : "xl:text-white"
                } inline-flex text-sm font-normal`}
              >
                {translate("locale", locale)}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
