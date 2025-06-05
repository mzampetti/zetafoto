import { SRCImage } from "react-datocms";
import InternalLink from "../Links/InternalLink";
export default function DoubleButtons({ first, second, locale }) {
  return (
    <div className="bg-primary z-10 relative">
      <div className="pb-16 grid gap-1 md:grid-cols-2 font-serif text-smd lg:text-xl max-w-[1800px] mx-auto">
        <InternalLink
          record={first}
          locale={locale}
          className={"group relative"}
        >
          <SRCImage
            data={first.cover?.responsiveImage}
            className="!max-w-none w-full"
          />
          <div className="bg-primary absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-6 py-3 whitespace-nowrap xl:px-10 xl:py-5">
            {first.title}
          </div>
        </InternalLink>
        <InternalLink
          record={second}
          locale={locale}
          className={"group relative block"}
        >
          <SRCImage
            data={second.cover?.responsiveImage}
            className="!max-w-none w-full"
          />
          <div className="bg-primary absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-6 py-3 whitespace-nowrap xl:px-10 xl:py-5">
            {second.title}
          </div>
        </InternalLink>
      </div>
    </div>
  );
}
