"use client";
import { motion, Variants } from "framer-motion";
import StructuredContent from "../Layout/StructuredContent";
import ButtonBlock from "./ButtonBlock";
import DynamicLink from "../Links/DynamicLink";
import CustomStructuredText from "../Layout/CustomStructuredText";

export default function TextBlock({ data, locale }) {
  const { displayOptions, label, textTitle, textText, link } = data;

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
    <div className="formatted max-w-[800px] mx-auto">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
      >
        <h2
          className="font-sans text-md inline-block w-full mb-6 lg:text-lg"
          dangerouslySetInnerHTML={{ __html: textTitle }}
        />
        {textText && (
          <div
            className="mb-8 "
            dangerouslySetInnerHTML={{ __html: textText }}
          />
        )}
      </motion.div>
    </div>
  );
}
