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
  return (
    <section className="bg-secondary text-primary md:py-16 py-10">
      <div className="container">
        <div className="flex justify-between gap-7 md:mb-6 mb-4 items-center">
          <h2 className="text-lg font-bold md:text-xl">
            {translate("otherPhotos", locale)}
            {title}
          </h2>
          <InternalLink
            record={record}
            locale={locale}
            className="group flex-none"
            title={title}
          >
            <div
              className="bg-primary text-secondary group-hover:bg-primary/80
              leading-none inline-block duration-200 py-2 pb-3 rounded-md px-4"
            >
              <span className="text-[15px] font-bold pb-2">{`${translate(
                "view-all",
                locale
              )} ${total}`}</span>
            </div>
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
