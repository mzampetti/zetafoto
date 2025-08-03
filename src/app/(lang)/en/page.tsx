import fetchDato from "@/lib/fetchDato";
import { HomeDocument, PhotoRecord, SiteLocale } from "@/graphql/generated";
import Wrapper from "@/components/Wrapper";
import HomePage from "@/components/Templates/HomePage";
import getSeoMeta from "@/lib/seoUtils";
import { shuffle } from "@/lib/shuffle";

const locale = "en" as SiteLocale;
const defaultLocale = "en" as SiteLocale;

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata() {
  const data = await fetchDato(HomeDocument, {
    locale,
    fallbackLocales: [defaultLocale],
  });

  const page = data?.homepage;
  return getSeoMeta(page, locale);
}

export default async function Page() {
  const data = await fetchDato(HomeDocument, {
    locale,
    fallbackLocales: [defaultLocale],
  });

  const randomPhotos = shuffle(data.allPhotos as PhotoRecord[]).slice(0, 12);

  return (
    <Wrapper locale={locale}>
      <HomePage
        page={data?.homepage as any}
        photos={randomPhotos}
        locale={locale}
      />
    </Wrapper>
  );
}
