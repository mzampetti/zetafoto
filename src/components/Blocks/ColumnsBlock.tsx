import { SiteLocale } from "@/graphql/generated";
import { motion, Variants } from "framer-motion";

type PropsContactTextBlock = {
  data: any;
  locale: SiteLocale;
};

const ColumnsBlock = ({ data, locale }: PropsContactTextBlock) => {
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

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
    >
      <section className="lg:flex gap-4 formatted border-b border-dashed border-primary-content pb-12 max-w-[1000px] lg:px-[100px] mx-auto lg:gap-12">
        <div
          className="lg:w-1/2"
          dangerouslySetInnerHTML={{ __html: data.leftColumnText }}
        />
        <div
          className="lg:w-1/2 lg:mt-2"
          dangerouslySetInnerHTML={{ __html: data.rightColumnText }}
        />
      </section>
    </motion.div>
  );
};

export default ColumnsBlock;
