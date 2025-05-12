import Image from "next/image";
import InternalLink from "../Links/InternalLink";
import { SiteLocale } from "@/graphql/generated";

type Props = {
  data: any;
  logo: string;
  locale: SiteLocale;
};

export default function MenuFooter({ data, logo, locale }: Props) {
  const titleClass = "uppercase font-bold my-3 text-primary-content text-sm";
  const itemClass =
    "text-sm group-hover:underline underline-offset-2 text-primary-content py-0.5";

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start">
      <div className="relative aspect-[3/1] w-[270px] grayscale lg:col-span-4">
        <Image
          src={logo}
          fill
          alt="Logo Fondazione Lisio"
          title="Logo Fondazione Lisio"
          className="object-left object-contain"
        />
      </div>
      <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 md:mt-12 lg:mt-0 gap-8 md:gap-y-12 items-start">
        {data.map((d: any) => (
          <div key={d.id} className="grid gap-2">
            {d.title && <div className={titleClass}>{d.title}</div>}
            {d.items.length > 0 &&
              d.items.map((p: any) => (
                <InternalLink
                  key={p.id}
                  className="group"
                  locale={locale}
                  record={p.page}
                >
                  <div
                    className={p.page.title ? itemClass : titleClass}
                    key={p.page.id}
                  >
                    {p.page.title}
                  </div>
                </InternalLink>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
