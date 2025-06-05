import fetchDato from "@/lib/fetchDato";
import { draftMode } from "next/headers";
import { PhotosCollectionDocument, SiteLocale } from "@/graphql/generated";
import getSeoMeta from "@/lib/seoUtils";
import { notFound } from "next/navigation";
import IndexTmp from "@/components/Templates/IndexTmp";
import Wrapper from "@/components/Wrapper";
import CardPhoto from "@/components/Blocks/CardPhoto";

type Params = {
  params: {
    slug: string;
  };
};

const locale = "it" as SiteLocale;
const siteLocale = locale as SiteLocale;

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const data = await fetchDato(
    PhotosCollectionDocument,
    {
      locale: siteLocale,
      slug,
    },
    false
  );
  const page: any = data?.photosCollection || null;
  const meta = getSeoMeta(page, locale);
  return meta;
}

export default async function Page({ params: { slug } }: Params) {
  const { isEnabled } = draftMode();
  const data = await fetchDato(
    PhotosCollectionDocument,
    {
      locale: siteLocale,
      slug,
    },
    isEnabled
  );
  if (!data?.photosCollection) notFound();

  return (
    <Wrapper
      locale={locale}
      model={data.photosCollection._modelApiKey}
      pages={[data.photosCollectionsIndex, data.photosCollection]}
    >
      <div className="py-6 md:py-12">
        <div className="container">
          <div>
            <h1 className="font-semibold text-lg md:text-xl">
              {data.photosCollection.name}
            </h1>
          </div>
        </div>
      </div>
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {data.photosCollection.photos.map((photo: any) => (
              <CardPhoto key={photo.id} photo={photo} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
