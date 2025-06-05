"use client";

import { SRCImage } from "react-datocms";
import { PhotoRecord, SiteLocale } from "@/graphql/generated";
import InternalLink from "../Links/InternalLink";

type PropsCardPhoto = {
  locale: SiteLocale;
  photo: PhotoRecord;
};

const CardPhoto = ({ photo, locale }: PropsCardPhoto) => {
  const { image, title, location, city } = photo;

  return (
    <InternalLink
      record={photo}
      locale={locale}
      title={title}
      className="group"
    >
      <SRCImage
        className="brightness-75 group-hover:brightness-100 transition-all motion-safe:duration-300"
        data={photo.image.responsiveImage}
      />
      <div className="">
        {title && <h3 className="mt-2 font-semibold text-md">{title}</h3>}
        {location && <div className="font-light">{location.name}</div>}
        {city && (
          <div
            dangerouslySetInnerHTML={{ __html: city.name }}
            className="font-light"
          />
        )}
      </div>
    </InternalLink>
  );
};

export default CardPhoto;
