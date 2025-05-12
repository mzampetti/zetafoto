import SectionTitle from "@/components/Blocks/SectionTitle";
import SingleFeature from "@/components/Blocks/SingleFeature";
import { Maybe } from "graphql/jsutils/Maybe";
import { motion, Variants } from "framer-motion";

type Props = {
  features: any[];
  featuresHeader: string;
  featuresSubheader: Maybe<string>;
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

const FeaturesList = ({
  features,
  featuresHeader,
  featuresSubheader,
}: Props) => {
  return (
    <div className="container">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
      >
        <SectionTitle
          title={featuresHeader}
          paragraph={featuresSubheader}
          center
        />

        <div className="grid gap-3 md:gap-10 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {features.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesList;
