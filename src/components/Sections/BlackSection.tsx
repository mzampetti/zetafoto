import { PhotoRecord, SiteLocale } from "@/graphql/generated";
import CardPhoto from "../Blocks/CardPhoto";

interface Props {
  locale: SiteLocale;
  title?: String;
  items: any;
}

export default function BlackSection({ locale, title, items }: Props) {
  return (
    <section className="bg-secondary text-primary py-16">
      <div className="container">
        {title && (
          <h2 className="text-lg font-bold mb-6 lg:text-xl">{title}</h2>
        )}
        <div className="grid gap-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item: PhotoRecord) => (
            <CardPhoto
              key={item.id}
              photo={item as PhotoRecord}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
