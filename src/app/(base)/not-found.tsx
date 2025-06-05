import ButtonBlock from "@/components/Blocks/ButtonBlock";
import HeaderRenderer from "@/components/Header/HeaderRenderer";
import { MenuDocument, SiteLocale } from "@/graphql/generated";
import translate from "@/labels";
import fetchDato from "@/lib/fetchDato";
import Link from "next/link";

export default async function NotFound() {
  const locale = "it" as SiteLocale;
  const defaultLocale = "it" as SiteLocale;

  const menuData = await fetchDato(MenuDocument, {
    locale: locale,
    fallbackLocales: [defaultLocale],
  });

  return (
    <>
      <HeaderRenderer data={menuData} locale={locale} />
      <div className="relative z-0 flex items-center h-full bg-primary py-20 md:py-48">
        <div className="absolute inset-0 bg-logo-sm opacity-10 bg-[length:150px_120px] lg:top-10" />
        <div className="container z-20">
          <div className="grid gap-5 text-center flex-wrap justify-center md:gap-8 lg:gap-12">
            <div className="md:text-md max-w-prose text-base text-base-100 font-serif">
              {translate("404.text", locale)}
            </div>
            <h1 className="md:text-4xl text-2xl font-bold uppercase font-serif text-secondary">
              {translate("404.title", locale)} 🚩
            </h1>
            <Link href="/it">
              <ButtonBlock label={translate("404.button", locale)} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
