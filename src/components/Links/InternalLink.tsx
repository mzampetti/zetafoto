import Link from "next/link";
import resolveLink from "@/lib/resolveLink";

type InternalinkProps = {
  record: any;
  locale: string;
  children?: any;
  title?: string;
  className?: any;
};

export default function InternalLink({
  record,
  locale,
  title,
  className,
  children,
}: InternalinkProps) {
  // return record._modelApiKey;
  return (
    <>
      <Link
        className={className}
        href={resolveLink({ ...record, locale })}
        title={`${title ? title : record.title}`}
      >
        {children}
      </Link>
    </>
  );
}
