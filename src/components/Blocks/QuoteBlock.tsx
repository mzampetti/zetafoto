import { JSXElementConstructor, ReactElement } from "react";

type Props = {
  text:
    | (string | ReactElement<any, string | JSXElementConstructor<any>>)[]
    | undefined;
  author: string;
};

const QuoteBlock = ({ text, author }: Props) => {
  if (!text) return <></>;
  return (
    <div className="relative py-8">
      <div className="text-[140px] text-accent italic font-sans absolute -left-8 -top-[20px]">
        "
      </div>
      <div className="pt-20 font-sans text-md lg:text-2xl">{text}</div>
      <div className="mt-8 uppercase font-sans text-sm lg:mt-16">{author}</div>
    </div>
  );
};

export default QuoteBlock;
