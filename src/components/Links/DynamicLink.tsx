import InternalLink from "./InternalLink";
import ExternalLink from "./ExternalLink";
import { SiteLocale } from "@/graphql/generated";

type Props = {
  children: any;
  locale: SiteLocale;
  link: any;
  className?: String;
};

export default function DynamicLink({
  link,
  className,
  children,
  locale,
}: Props) {
  if (!link) return null;

  const linkClassName = className ? `group ${className}` : "group";

  // return link.__typename === "InternalLinkRecord" ? (
  <InternalLink
    className={linkClassName}
    record={link.page}
    title={link.label}
    locale={locale}
  >
    {children}
  </InternalLink>;
  // ) : (
  //   <ExternalLink
  //     className={linkClassName}
  //     url={link.url}
  //     title={link.label}
  //     locale={locale}
  //   >
  //     {children}
  //   </ExternalLink>
  // );
}
