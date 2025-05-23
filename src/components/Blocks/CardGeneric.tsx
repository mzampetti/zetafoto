"use client";
import { SRCImage } from "react-datocms";
import { SiteLocale } from "@/graphql/generated";
import InternalLink from "../Links/InternalLink";
import { getInfoFromModel } from "@/lib/getInfoFromModel";
import { getDate } from "@/lib/getDate";
import ButtonBlock from "./ButtonBlock";
import CardProduct from "./CardProduct";
import CustomIcon from "./CustomIcon";

type PropsCard = {
  locale: SiteLocale;
  data: any;
  variant?: Boolean;
};

const colorClass = {
  neutral: "bg-neutral text-neutral-content",
  warning: "bg-warning text-warning-content",
  success: "bg-success text-success-content",
  info: "bg-info text-info-content",
};
const colorClassCircle = {
  neutral: "bg-neutral-content",
  warning: "bg-warning-content",
  success: "bg-success-content",
  info: "bg-info-content",
};

const CardGeneric = ({ data, locale, variant }: PropsCard) => {
  const { images, name, description, _modelApiKey, serial } = data || {};
  const info = getInfoFromModel(_modelApiKey, locale);
  const responsiveImage =
    images?.length > 0 ? images[0].responsiveImage || null : null;

  return (
    <InternalLink record={data} locale={locale} title={name} className="group">
      <div className="group border rounded-md p-4">
        {responsiveImage ? (
          <SRCImage
            data={responsiveImage || responsiveImage}
            className="!max-w-full md:!h-full md:object-cover group-hover:brightness-110 duration-300"
          />
        ) : (
          <img
            src="https://www.datocms-assets.com/4382/1744719859-stonfo_placeholder.jpg?auto=format%2Ccompress&fit=max"
            title={name}
          />
        )}
        <div className="duration-300 mt-4">
          <div className="grid gap-3">
            <h2 className="font-sans tracking-widest text-base font-bold group-hover:underline group-hover:underline-offset-4">
              {name}
            </h2>
            {serial && (
              <div className="text-sm flex gap-1">
                {locale === "it" ? "Codice articolo:" : "Product code:"}{" "}
                <div className="font-bold">{serial}</div>
              </div>
            )}
            {description && (
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                className="line-clamp-2 opacity-80"
              />
            )}
          </div>
          <div className="bg-secondary rounded-full border-secondary border w-14 h-9 group-hover:bg-primary duration-300 mt-3 mb-2 relative">
            <CustomIcon
              classes="size-20 bg-base-content absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:duration-200 group-hover:bg-primary-content bg-primary"
              fileName="arrow"
            />
          </div>
        </div>
      </div>
    </InternalLink>
  );
};

export default CardGeneric;
