"use client";

import { SiteLocale } from "@/graphql/generated";
import CardPhoto from "@/components/Blocks/CardPhoto";

interface IndexTmpProps {
  locale: SiteLocale;
  record: any;
}

export default function IndexTmp({ record, locale }: IndexTmpProps) {
  return (
    <>
      <div className="py-6 md:py-12">
        <div className="container">
          <div>
            <h1 className="font-semibold text-lg md:text-xl">{record.name}</h1>
          </div>
        </div>
      </div>
      <section className="bg-secondary text-primary py-16">
        <div className="container">
          <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            {record.photos.map((photo: any) => (
              <CardPhoto key={photo.id} photo={photo} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
