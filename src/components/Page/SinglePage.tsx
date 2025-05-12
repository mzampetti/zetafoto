import { SiteLocale } from "@/graphql/generated";
import { Image as DatoImage } from "react-datocms";
import InternalLink from "../Links/InternalLink";
import CustomIcon from "../Blocks/CustomIcon";

type Props = {
  page: any;
  locale: SiteLocale;
};

const SinglePage = ({ page, locale }: Props) => {
  const { abstract, title, previewImage } = page;
  return (
    <>
      <InternalLink record={page} className="group" locale={locale}>
        <div className="relative h-full bg-base-100 p-3 pt-6 md:p-6 lg:pt-8 group-hover:-translate-y-4 duration-300 gap-6 grid text-base-content">
          <div className={`prefix`}>pagine</div>
          {title && <h2 className="title-small">{title}</h2>}
          {abstract && (
            <div
              dangerouslySetInnerHTML={{ __html: abstract }}
              className="text"
            />
          )}
          {previewImage && (
            <div className="overflow-hidden">
              <DatoImage
                className="group-hover:scale-110 duration-500"
                data={previewImage.responsiveImage}
              />
            </div>
          )}
          <div className="bg-base-100 rounded-full border-base-200 border w-14 h-9 absolute bottom-12 right-12 group-hover:bg-neutral duration-300">
            <CustomIcon
              classes="w-[14px] h-[14px] bg-base-content absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 motion-safe:duration-200 group-hover:bg-base-100"
              fileName="arrow-right"
            />
          </div>
        </div>
      </InternalLink>
    </>
  );
};

export default SinglePage;
