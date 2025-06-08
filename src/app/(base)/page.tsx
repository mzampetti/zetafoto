import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import {
  HomeDocument,
  HomepageRecord,
  PhotoRecord,
  SiteLocale,
} from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import HomePage from "@/components/Templates/HomePage";
import getSeoMeta from "@/lib/seoUtils";
import { shuffle } from "@/lib/shuffle";

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;
const defaultLocale = "it" as SiteLocale;
export async function generateMetadata() {
  const data = await fetchDato(
    HomeDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    false
  );
  const page: any = data?.homepage || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    HomeDocument,
    {
      locale: siteLocale,
      fallbackLocales: [defaultLocale],
    },
    isEnabled
  );
  const randomPhotos = shuffle(data.allPhotos as PhotoRecord[]).slice(0, 12);

  return (
    <Wrapper locale={locale}>
      <HomePage
        page={data?.homepage as any}
        photos={randomPhotos as PhotoRecord[]}
        locale={locale}
      />
    </Wrapper>
  );
}
