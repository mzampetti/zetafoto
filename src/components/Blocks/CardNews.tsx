"use client";
import translate from "@/labels";
import { NewsRecord, SiteLocale } from "@/graphql/generated";
import ButtonBlock from "./ButtonBlock";
import Link from "next/link";
import Image from "next/image";

type PropsCardBlog = {
  locale: SiteLocale;
  data: NewsRecord;
  i: number;
};

const CardNews = ({ data, locale, i }: PropsCardBlog) => {
  const { image, title, text, url } = data;
  const titleClass = "font-semibold";
  return (
    <Link className="group" href={url} locale={locale} title={title}>
      <div className="custom-shadow rounded-md bg-white">
        <div className="relative aspect-[3/2]">
          <Image
            src={image.responsiveImage.src}
            alt={title}
            title={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4 grid gap-2 border-t border-secondary/5">
          <h2 className={titleClass}>{title}</h2>
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }} />
          <div className="inline-block">
            <ButtonBlock label={translate("read", locale)} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardNews;
