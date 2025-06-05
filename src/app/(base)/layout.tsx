import { toNextMetadata } from "react-datocms";
import config from "@/data/config";
import "@/styles/globals.css";
import {
  SiteLocale,
  LayoutDocument,
  // FooterDocument,
} from "@/graphql/generated";
import Footer from "@/components/Footer";
import fetchDato from "@/lib/fetchDato";
import SkipLinks from "@/components/Layout/SkipLinks";

const locale = "it";
const siteLocale = locale as SiteLocale;
const defaultLocale = config.defaultLocale as SiteLocale;

export async function generateMetadata() {
  const siteLocale = locale as SiteLocale;
  const data = await fetchDato(LayoutDocument, { locale: siteLocale }, false);
  const globalSeo = data?._site?.globalSeo || null;
  const fallbackSeo = globalSeo?.fallbackSeo;
  const icon = toNextMetadata(data._site.faviconMetaTags || []);
  const metaObject = {
    ...icon,
    title: fallbackSeo?.title,
    description: fallbackSeo?.description,
    openGraph: {
      title: fallbackSeo?.title,
      description: fallbackSeo?.description,
      siteName: globalSeo?.siteName,
      images: fallbackSeo?.image,
      locale,
      type: "website",
    },
  };
  return metaObject;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} data-theme="custom">
      <body className={`md:min-h-screen`}>
        <SkipLinks locale={locale} />
        <main>{children}</main>
        <Footer locale={siteLocale} />
      </body>
    </html>
  );
}
