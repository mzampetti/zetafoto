"use client";
import Link from "next/link";
import ButtonBlock from "./ButtonBlock";

export default function TitleTextBlock({ data, locale, bg, variant }) {
  const { linkInternal, doubleColumn, title, text, cta } = data;
  const linkHref = linkInternal
    ? `${locale === "en" ? "/en" : ""}/${linkInternal.slug}`
    : "";

  return (
    <div
      className={
        variant === "withImg" ? "px-[5vw] 2xl:pl-0 2xl:pr-[10vw]" : "container"
      }
    >
      <div
        className={`${
          doubleColumn ? "lg:grid-cols-2" : ""
        } grid gap-8 grid-cols-1 lg:gap-16`}
      >
        {title && (
          <div
            className={
              bg === "red" ? "text-primary-content formatted" : "formatted"
            }
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <div className="grid gap-8 grid-cols-1 lg:gap-16">
          <div
            className="font-sans text-md lg:text-lg"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          {linkInternal && (
            <Link href={linkHref} title={linkInternal.title}>
              <ButtonBlock
                label={cta}
                color={bg === "dark" ? "white" : bg === "red" ? "red" : ""}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
