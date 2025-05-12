import CustomIcon from "@/components/Blocks/CustomIcon";
import { SiteLocale } from "@/graphql/generated";
import ExternalLink from "../Links/ExternalLink";
import { motion, Variants } from "framer-motion";
import { Fragment } from "react";

type PropsAttachmentsBlock = {
  data?: any;
  locale: SiteLocale;
  style: string;
};

const AttachmentsBlock = ({ data, style, locale }: PropsAttachmentsBlock) => {
  const { attachments, attachmentPrefix, attachmentText, attachmentTitle } =
    data;
  const bg =
    style === "bg-secondary text-secondary-content"
      ? "bg-primary text-primary-content"
      : "bg-secondary text-secondary-content";
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
    <div className="container">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
      >
        <div
          className={`py-16 xl:py-24 grid items-start gap-8 px-8 xl:px-20 ${bg}`}
        >
          {attachmentPrefix && <div className="prefix">{attachmentPrefix}</div>}
          {attachmentTitle && <h2 className="title">{attachmentTitle}</h2>}
          {attachmentText && (
            <h3
              className="text"
              dangerouslySetInnerHTML={{ __html: attachmentText }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AttachmentsBlock;
