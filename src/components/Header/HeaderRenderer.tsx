import { MenuQuery, SiteLocale } from "@/graphql/generated";
import Header from ".";

type Props = {
  locale: SiteLocale;
  data: MenuQuery;
  hrefs?: any;
  model?: string;
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

const HeaderRenderer = async ({ data, model, hrefs, locale }: Props) => {
  return <Header lng={locale} data={data} model={model} hrefs={hrefs} />;
};

export default HeaderRenderer;
