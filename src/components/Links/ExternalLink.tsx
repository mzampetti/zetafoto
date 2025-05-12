import translate from "@/labels";

export default function ExternalLink({
  className,
  url,
  children,
  title,
  locale,
}: any) {
  return (
    <>
      <a
        href={url}
        className={className}
        title={`${title} ${translate("go_to_external", locale)}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    </>
  );
}
