import { PageRecord, SiteLocale } from "@/graphql/generated";
import SectionTitle from "@/components/Blocks/SectionTitle";
import { Maybe } from "graphql/jsutils/Maybe";
import { motion, Variants } from "framer-motion";
import CardPageBlock from "./CardPageBlock";

type Props = {
  title?: string;
  subtitle?: Maybe<string>;
  locale: SiteLocale;
  pages: PageRecord[];
};

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

const FeaturedPages = ({ title, subtitle, pages, locale }: Props) => {
  return (
    <div className="container">
      <div className="z-[1] relative">
        {(title || subtitle) && (
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.1 }}
            variants={variants}
          >
            <SectionTitle title={title} paragraph={subtitle} />
          </motion.div>
        )}

        <div className="lg:grid-cols-2 grid gap-2">
          {pages?.map((p: PageRecord, i: number) => (
            <CardPageBlock i={i} key={p.id} data={p} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPages;
