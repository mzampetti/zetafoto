import { StructuredText, renderNodeRule } from "react-datocms";
import { isHeading, isParagraph, isLink } from "datocms-structured-text-utils";
import React from "react";

type StructuredContentProps = {
  locale: string;
  data: any;
  title?: string;
};

export default function StructuredContent({
  data,
  locale,
  title,
}: StructuredContentProps) {
  const getTextSizeForHeading = (nodeLevel: number) => {
    switch (nodeLevel) {
      case 1:
        return "text-lg my-4";
      case 2:
        return "text-lg my-4";
      case 3:
        return "text-lg my-4";
      case 4:
        return "text-lg my-4";
      case 5:
        return "text-lg my-4";
      case 6:
        return "text-lg my-4";
      default:
        "";
    }
  };
  return (
    <div>
      {title && <div>{title}</div>}
      <StructuredText
        data={data}
        customNodeRules={[
          renderNodeRule(isHeading, ({ node, children, key }) => {
            const Tag = `h${node.level}` as any;
            const textSize = getTextSizeForHeading(node.level);
            return (
              <Tag className={`${textSize}`} key={key}>
                {children}
              </Tag>
            );
          }),
          renderNodeRule(isParagraph, ({ children, key, ancestors }) => {
            if (
              ancestors[0].type === "listItem" &&
              ancestors[0].children.length === 1
            ) {
              return <React.Fragment key={key}>{children}</React.Fragment>;
            }

            return <p key={key}>{children}</p>;
          }),
          renderNodeRule(isLink, ({ node, children, key }) => {
            return (
              <a
                className="underline"
                key={key}
                target="_blank"
                rel="noreferrer"
                title={node.url || "link"}
                href={node.url}
                aria-label={`${node.url || "link"} open in new window`}
              >
                {children}
              </a>
            );
          }),
        ]}
        renderBlock={({ record }) => {
          if (!record) return null;
          const frame: any = record;
          switch (record.model) {
            default:
              return (
                <div dangerouslySetInnerHTML={{ __html: `${record.code}` }} />
              );
          }
        }}
      />
    </div>
  );
}
