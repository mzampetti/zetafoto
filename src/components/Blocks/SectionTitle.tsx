import { Maybe } from "graphql/jsutils/Maybe";
import ReactMarkdown from "react-markdown";

const SectionTitle = ({
  title,
  paragraph,
  center,
}: {
  title: string;
  paragraph: Maybe<string>;
  center?: boolean;
}) => {
  return (
    <>
      <div className={`w-full grid gap-6`}>
        {title && (
          <h2 className="text-lg font-light font-serif max-w-prose lg:text-xl;">
            {title}
          </h2>
        )}
        {paragraph && (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        )}
      </div>
    </>
  );
};

export default SectionTitle;
