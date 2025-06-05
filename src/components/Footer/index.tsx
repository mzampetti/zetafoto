import FooterRenderer from "./FooterRenderer";
import { SiteLocale } from "@/graphql/generated";

type Props = {
  locale: SiteLocale;
};

const Footer = async ({ locale }: Props) => {
  return <FooterRenderer lng={locale} />;
};

export default Footer;
