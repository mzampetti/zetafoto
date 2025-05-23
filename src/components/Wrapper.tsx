import config from "@/data/config";
import "@/styles/globals.css";
import HeaderRenderer from "@/components/Header/HeaderRenderer";
import fetchDato from "@/lib/fetchDato";
import { MenuDocument, SiteLocale } from "@/graphql/generated";
import { draftMode } from "next/headers";

type Props = {
  hrefs?: any;
  locale: SiteLocale;
  children: any;
};

export default async function Wrapper({ hrefs, locale, children }: Props) {
  const { isEnabled } = draftMode();
  const menuData = await fetchDato(
    MenuDocument,
    {
      locale: locale,
    },
    isEnabled
  );
  return (
    <>
      <HeaderRenderer hrefs={hrefs} data={menuData} locale={locale} />
      {children}
    </>
  );
}
