import config from "@/data/config";
import "@/styles/globals.css";
import HeaderRenderer from "@/components/Header/HeaderRenderer";
import fetchDato from "@/lib/fetchDato";
import { MenuDocument, SiteLocale } from "@/graphql/generated";
import { draftMode } from "next/headers";
import Breadcrumbs from "./Layout/Breadcrumbs";

type Props = {
  pages?: any;
  locale: SiteLocale;
  children: any;
  model?: string;
  hrefs?: any;
};

export default async function Wrapper({
  pages,
  model,
  hrefs,
  locale,
  children,
}: Props) {
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
      <HeaderRenderer
        data={menuData}
        model={model}
        hrefs={hrefs}
        locale={locale}
      />
      <Breadcrumbs pages={pages} locale={locale} hrefs={hrefs} />
      {children}
    </>
  );
}
