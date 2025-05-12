"use client";

import { useState } from "react";
import { StructuredText } from "react-datocms/structured-text";
import { motion, Variants } from "framer-motion";
import { Maybe } from "graphql/jsutils/Maybe";
import Highlighter from "./Highlighter";

const closeIcon = (
  <span className="border border-red rounded-full p-3 block">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-4 text-red"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  </span>
);

const openIcon = (
  <span className="border border-black/40 rounded-full p-3 inline-block">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </span>
);

type Props = {
  questions: any;
};

const FAQAccordion = ({ questions }: Props) => {
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

  return (
    <div className="container">
      <div className="grid gap-6 grid-cols-1">
        <div className="mt-12 border-t border-black/20 md:mb-20 md:mt-0">
          {questions.map((question, n: number) => {
            const isOpen = openQuestions.includes(question.id);
            return (
              <motion.div
                layout="position"
                key={question.id}
                className={"py-6 lg:py-10 border-b border-black/20 group"}
                onClick={() => {
                  toggleQuestion(question.id);
                }}
              >
                <button className="flex w-full text-left lg:items-center justify-between">
                  <div
                    className={`${
                      isOpen ? "text-red" : ""
                    } uppercase font-sans lg:text-xl group-hover:text-red duration-200`}
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <div className="w-20 flex justify-end flex-none items-start">
                    {isOpen ? closeIcon : openIcon}
                  </div>
                </button>

                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    open: { opacity: 1 },
                    closed: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className={"mt-2 font-sans" + (isOpen ? "" : " hidden")}
                >
                  <div
                    className="formatted opacity-70"
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
