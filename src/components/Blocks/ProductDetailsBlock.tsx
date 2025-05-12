import { SiteLocale } from "@/graphql/generated";
import Image from "next/image";
import CustomIcon from "@/components/Blocks/CustomIcon";
import { SRCImage } from "react-datocms";
import DynamicLink from "../Links/DynamicLink";
import ButtonBlock from "./ButtonBlock";
import { motion, Variants } from "framer-motion";

type PropsProductDetailsBlock = {
  data: any;
  locale: SiteLocale;
};

function RenderValue(value: any) {
  if (value.star) {
    const icons = [];
    for (let i = 0; i < parseInt(value.value); i++) {
      icons.push(
        <CustomIcon key={i} classes="bg-base-content w-3 h-3" fileName="star" />
      );
    }
    return icons;
  } else {
    return value.value;
  }
}
const variants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
};

const ProductDetailsBlock = ({ data, locale }: PropsProductDetailsBlock) => {
  const {
    title,
    description,
    productDetailImage,
    imageDescription,
    link,
    logo,
    values,
  } = data;
  return (
    <>
      <div className="container">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={variants}
        >
          <div className="bg-base-100 px-4 py-8 pb-12 md:px-12 md:py-16 text-base-content">
            <h2 className="title">{title}</h2>
            <div className="md:grid md:grid-cols-2 xl:grid-cols-3 gap-20 xl:mt-8 items-start">
              <div className="">
                {logo && (
                  <div className="w-[180px] h-[56px] relative mt-8">
                    <Image
                      src={logo.url}
                      className="object-contain absolute inset-0 w-full h-full object-left"
                      alt={`Logo ${title}`}
                      title={`Logo ${title}`}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                {values.length > 0 && (
                  <div className="pt-8">
                    {values?.map((v: any) => (
                      <div
                        className="flex justify-between border-b border-primary-content/40 py-2.5 items-center"
                        key={v.id}
                      >
                        <div className="uppercase text-sm">{v.key}</div>
                        <div className="text-sm flex">{RenderValue(v)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {productDetailImage && (
                <div className="">
                  <div className="rounded-full bg-primary mt-20 aspect-[5/7] relative md:mt-10">
                    <div className="w-[70%] h-[70%] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
                      <SRCImage
                        data={productDetailImage.responsiveImage}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {imageDescription && (
                    <div
                      className="text-sm text-primary-content/80 mt-4"
                      dangerouslySetInnerHTML={{ __html: imageDescription }}
                    />
                  )}
                </div>
              )}
              <div className="md:col-span-2 xl:col-span-1 grid gap-6 items-start">
                {title && <h3 className="title-small">{title}</h3>}
                {description && (
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                {link && (
                  <DynamicLink link={link} locale={locale} className={`block`}>
                    <ButtonBlock label={link.label} />
                  </DynamicLink>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductDetailsBlock;
