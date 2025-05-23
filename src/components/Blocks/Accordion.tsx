"use client";

import { useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import { motion, Variants } from "framer-motion";
import { Maybe } from "graphql/jsutils/Maybe";
import { SRCImage } from "react-datocms";
import Highlighter from "./Highlighter";

const closeIcon = (
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 md:h-12 md:w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".8"
        d="M18 12H6"
      />
    </svg>
  </span>
);

const openIcon = (
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 md:h-12 md:w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.8"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </span>
);

type Props = {
  record: any;
  i: number;
};

const Accordion = ({ record, i }: Props) => {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  function toggleQuestion(id: string) {
    if (openQuestions.includes(id)) {
      setOpenQuestions((openQuestions) => {
        return [...openQuestions.filter((qID) => qID !== id)];
      });
    } else {
      setOpenQuestions((openQuestions) => [...openQuestions, id]);
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

  const isOpen = openQuestions.includes(record.id);
  return (
    <motion.div
      layout="position"
      key={record.id}
      className={
        "py-2 hover:cursor-pointer bg-white border border-neutral rounded-tl-[50px]"
      }
      onClick={() => {
        toggleQuestion(record.id);
      }}
    >
      <button className="flex items-center w-full justify-between px-2 gap-4">
        {record.imgCover && (
          <SRCImage
            className="!w-[84px] !h-[84px] object-cover rounded-t-full"
            data={record.imgCover.responsiveImage}
          />
        )}
        <div className="flex-1 text-left">
          <div className="font-sans font-bold md:text-smd">
            {record.imgTitle}
          </div>
          <div className="mt-1 text-sm text-error-content">
            {record.subtitle}
          </div>
        </div>
        {isOpen ? closeIcon : openIcon}
      </button>

      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
        className={"mt-6 text-sm" + (isOpen ? "" : " hidden")}
      >
        <div
          className="formatted px-6 md:pl-[110px]"
          dangerouslySetInnerHTML={{ __html: record.imgText }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Accordion;
