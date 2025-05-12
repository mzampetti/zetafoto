import { SiteLocale } from "@/graphql/generated";
import TextBlock from "../Blocks/TextBlock";
import GalleryBlock from "../Blocks/GalleryBlock";
import CardPageBlock from "../Blocks/CardPageBlock";
import ColumnsBlock from "@/components/Blocks/ColumnsBlock";
import BannerCtaBlock from "../Blocks/BannerCtaBlock";
import ImageBlock from "../Blocks/ImageBlock";
import TextAnchorBlock from "../Blocks/DoubleImageBlock";
import MapBlock from "../Map/MapBlock";
import ExternalLink from "../Links/ExternalLink";
import ButtonBlock from "../Blocks/ButtonBlock";
import TitleTextBlock from "../Blocks/TitleTextBlock";
import DoubleImageBlock from "../Blocks/DoubleImageBlock";
import LabelsBlock from "../Blocks/LabelsBlock";

type Props = {
  section: any;
  locale: SiteLocale;
  i: number;
  bg?: string;
  variant?: string;
};

export default function Sections({ section, variant, locale, i, bg }: Props) {
  let content: any;
  switch (section._modelApiKey) {
    case "text_block": {
      content = (
        <div
          className="formatted"
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      );
      break;
    }
    case "image_block": {
      content = <ImageBlock data={section} locale={locale} />;
      break;
    }
    case "double_image_block": {
      content = <DoubleImageBlock data={section} locale={locale} />;
      break;
    }
    case "title_text_block": {
      content = (
        <TitleTextBlock
          variant={variant}
          data={section}
          locale={locale}
          bg={bg}
        />
      );
      break;
    }
    case "block_text": {
      content = <TextBlock data={section} locale={locale} />;
      break;
    }
    case "block_image_text": {
      content = (
        <div className="max-w-[1000px] mx-auto">
          <CardPageBlock
            titleSmall={true}
            locale={locale}
            data={section}
            i={i}
          />
        </div>
      );
      break;
    }
    case "gallery_block": {
      content = <GalleryBlock data={section} locale={locale} />;
      break;
    }
    case "label_title_block": {
      content = <LabelsBlock data={section} locale={locale} />;
      break;
    }

    case "block_bg_image":
      content =
        section.bgTitle || section.bgText ? (
          <BannerCtaBlock
            title={section.bgTitle}
            text={section.bgText}
            locale={locale}
            image={section?.bgCover}
            titleSmall={true}
          />
        ) : (
          <ImageBlock data={section.bgCover} locale={locale} />
        );
      break;

    default:
      content = (
        <div className="p-8 bg-accent-500 text-white">
          <div className="title">{`Manca questo blocco ${section._modelApiKey}`}</div>
        </div>
      );
      break;
  }
  return (
    <div
      key={section.id}
      category-data={section._modelApiKey}
      className="standard-vertical-m"
    >
      {content}
    </div>
  );
}
