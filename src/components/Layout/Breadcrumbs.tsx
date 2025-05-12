import { SiteLocale } from "@/graphql/generated";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Breadcrumbs({
  pages,
  locale,
}: {
  pages: any;
  locale: SiteLocale;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex container py-3 bg-white">
      <ol
        role="list"
        className="flex items-center space-x-2 uppercase font-sans tracking-wider"
      >
        <li>
          <div>
            <a
              href={locale === "it" ? "/" : "/en"}
              className="hover:opacity-85 text-sm block duration-75 3xl:text-xs"
            >
              <span className="">Home</span>
            </a>
          </div>
        </li>
        {pages.map((page: any) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 3xl:size-3"
              />
              <a
                href={page.href}
                aria-current={page.current ? "page" : undefined}
                className="ml-2 text-sm hover:opacity-85 block duration-75 3xl:text-xs truncate max-w-[150px]"
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
