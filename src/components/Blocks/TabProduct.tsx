import { SiteLocale } from "@/graphql/generated";

export default function TabProduct({
  locale,
  data,
}: {
  locale: SiteLocale;
  data: any;
}) {
  return (
    <>
      <div className="container mb-20 md:mt-20 lg:w-10/12 2xl:w-6/12">
        <h2 className="font-bold md:text-lg">
          {locale === "it" ? "Varianti" : "Variants"}
        </h2>
        <div className="grid grid-cols-12 mt-4 gap-4 border-b border-secondary pb-1 mb-4 md:mt-12">
          <div className="font-bold col-span-3">
            {locale === "it" ? "Codice" : "Code"}
          </div>
          <div className="font-bold col-span-6">
            {locale === "it" ? "Caratteristiche" : "Features"}
          </div>
          <div className="font-bold col-span-3">
            {locale === "it" ? "Note" : "Notes"}
          </div>
        </div>
        {data.map((d: any) => (
          <div
            className="grid grid-cols-12 text-sm gap-4 py-2 opacity-70 border-b border-secondary/10"
            key={d.id}
          >
            <div className="col-span-3">{d.code}</div>
            <div className="col-span-6">{d.feature}</div>
            <div className="col-span-3">{d.note}</div>
          </div>
        ))}
      </div>
    </>
  );
}
