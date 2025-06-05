import InternalLink from "@/components/Links/InternalLink";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import CardPhoto from "@/components/Blocks/CardPhoto";
import translate from "@/labels";
import { SiteLocale, PhotoRecord } from "@/graphql/generated";

type Props = {
  title: string;
  record: any;
  photos: any;
  total: number;
  locale: SiteLocale;
};

export default function OtherPhotosSection({
  title,
  record,
  photos,
  total,
  locale,
}: Props) {
  if (!photos || photos.length === 0) return null;
  // return record._modelApiKey;
  return (
    <section className="bg-secondary text-primary py-16">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-6 lg:text-xl">
            {translate("otherPhotos", locale)}
            {title}
          </h2>
          <InternalLink
            record={record}
            locale={locale}
            className="group -translate-y-3 flex-none scale-110"
            title={title}
          >
            <ButtonBlock
              color="white"
              label={`${translate("view-all", locale)} ${total}`}
            />
          </InternalLink>
        </div>
        <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo: any) => (
            <CardPhoto key={photo.id} photo={photo} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
