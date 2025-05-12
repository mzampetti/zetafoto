import { MenuQuery, SiteLocale } from "@/graphql/generated";
import Header from ".";

type Props = {
  locale: SiteLocale;
  data: MenuQuery;
  hrefs?: any;
};

export type Menu = {
  menuImage?: any;
  id: string;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export type NotificationStripType = {
  displayNotification: boolean;
  text: string;
  urlLabel: string | null | undefined;
  url: string | undefined | null;
};

const HeaderRenderer = async ({ data, hrefs, locale }: Props) => {
  return <Header hrefs={hrefs} lng={locale} data={data} />;
};

export default HeaderRenderer;
