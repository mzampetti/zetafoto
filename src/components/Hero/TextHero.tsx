"use client";

import { SiteLocale } from "@/graphql/generated";
import { Maybe } from "graphql/jsutils/Maybe";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import Link from "next/link";
import translate from "@/labels";

type Props = {
  heroTitle: string;
  heroText?: Maybe<string>;
  locale: SiteLocale;
  url?: string;
};
const TextHero = ({ heroTitle, heroText, locale, url }: Props) => {
  return (
    <header className="container py-4">
      <h1 className="text-xl font-bold mb-6">{heroTitle}</h1>
      {heroText && (
        <div
          className="md:w-[55%]"
          dangerouslySetInnerHTML={{ __html: heroText }}
        />
      )}
      {url && (
        <Link href={url} locale={locale}>
          <ButtonBlock label={translate("readMore", locale)} />
        </Link>
      )}
    </header>
  );
};

export default TextHero;
