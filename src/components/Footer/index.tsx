import FooterRenderer from "./FooterRenderer";
import { FooterQuery, SiteLocale } from "@/graphql/generated";

type Props = {
  locale: SiteLocale;
  data: FooterQuery;
};

const Footer = async ({ locale, data }: Props) => {
  return <FooterRenderer data={data} lng={locale} />;
};

export default Footer;
