"use client";

import QuoteBlock from "@/components/Blocks/QuoteBlock";
import {
  isBlockquote,
  isHeading,
  isLink,
  isParagraph,
} from "datocms-structured-text-utils";
import { StructuredText, renderNodeRule } from "react-datocms";

import Link from "next/link";
import Highlighter from "@/components/Blocks/Highlighter";
import AttachmentsBlock from "@/components/Blocks/AttachmentsBlock";
import GalleryBlock from "@/components/Blocks/GalleryBlock";
import ImageBlock from "@/components/Blocks/ImageBlock";
import React from "react";
import InternalLink from "../Links/InternalLink";
import { SiteLocale } from "@/graphql/generated";

type Props = {
  record: any;
  locale: SiteLocale;
};

export default function CustomStructuredText({ locale, record }: Props) {
  return (
    <>
      <StructuredText
        data={record as any}
        renderNode={Highlighter}
        renderBlock={({ record }: any) => {
          switch (record.__typename) {
            case "ImageBlockRecord":
              const ImageBlockRecord = record as any;
              return (
                <div key={record.id} className="unwrapped standard-vertical-m">
                  <ImageBlock data={ImageBlockRecord} locale={locale} />
                </div>
              );

            case "AttachmentsBlockRecord":
              const attachmentsBlock = record as any;
              return (
                <div key={record.id} className="unwrapped standard-vertical-m">
                  <AttachmentsBlock
                    style=""
                    data={attachmentsBlock}
                    locale={locale}
                  />
                </div>
              );

            case "GallerySectionRecord": {
              const gallerySection = record as any;

              return (
                <div key={record.id} className="unwrapped standard-vertical-m">
                  <GalleryBlock data={gallerySection} locale={locale} />
                </div>
              );
            }
            default:
              return null;
          }
        }}
        renderLinkToRecord={({ record, children }: any) => {
          return (
            <InternalLink
              record={record}
              locale={locale}
              title={record.title}
              className="underline"
            >
              {children}
            </InternalLink>
          );
        }}
        renderInlineRecord={({ record, children }: any) => {
          return (
            <InternalLink
              key={record.id}
              record={record}
              locale={locale}
              className="underline"
            >
              {children}
            </InternalLink>
          );
        }}
        customNodeRules={[
          renderNodeRule(isHeading, ({ node, children, key }) => {
            let Tag: any;
            Tag = `h${node.level}`;
            let classTitle: string;
            if (node.level == 2) {
              classTitle = "title mb-4 w-10/12 max-w-prose";
            } else classTitle = "title-small mb-4 w-10/12 max-w-prose";
            return (
              <Tag className={classTitle} key={key}>
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
            const attributeObject =
              node.meta?.reduce((acc: any, { id, value }) => {
                acc[id] = value;
                return acc;
              }, {}) || {};

            return (
              <a
                className="underline"
                href={node.url}
                key={key}
                {...attributeObject}
              >
                {children}
              </a>
            );
          }),
          renderNodeRule(isBlockquote, ({ children, key, node }) => {
            return <QuoteBlock text={children} author={node.attribution} />;
          }),
        ]}
      />
    </>
  );
}
