import { StructuredText } from "react-datocms/structured-text";
import ReactMarkdown from "react-markdown";
import Highlighter from "./Highlighter";

type Props = {
  questions: any;
};

const FAQGrid = ({ questions }: Props) => {
  return (
    <div className="">
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 xl:grid-cols-2">
        {questions?.map((q: any) => {
          return (
            <div key={q.id} className="flex gap-4">
              <div className="inline-block h-12 rounded-lg bg-primary opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: q.question }}
                  className="text-xl font-semibold font-serif uppercase"
                />

                <div
                  dangerouslySetInnerHTML={{ __html: q.answer }}
                  className="mt-2"
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQGrid;
