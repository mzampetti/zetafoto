import { SiteLocale } from "@/graphql/generated";
import resolveLink from "@/lib/resolveLink";

export default function Breadcrumbs({
  pages,
  locale,
  hrefs,
}: {
  pages?: any;
  hrefs?: any;
  locale: SiteLocale;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex container py-3 pt-[75px] md:pt-20"
    >
      <ol role="list" className="flex items-center space-x-2 flex-wrap">
        <li>
          <div>
            <a
              href={locale === "it" ? "/" : "/en"}
              className="hover:opacity-85 font-bold text-[14px] block duration-200"
            >
              <span className="">Home</span>
            </a>
          </div>
        </li>
        {pages?.map((page: any, index: number) => {
          const isLast = index === pages.length - 1;
          return (
            <li key={page.title ? page.title : page.name}>
              <div className="flex items-center">
                /
                {isLast ? (
                  <span
                    aria-current="page"
                    className="ml-2 text-[14px] block duration-75 3xl:text-xs text-gray-500 cursor-default"
                  >
                    {page.title ? page.title : page.name}
                  </span>
                ) : (
                  <a
                    href={resolveLink({
                      _modelApiKey: page._modelApiKey,
                      locale: locale,
                      slug: page.slug,
                    })}
                    className="font-bold ml-2 text-[14px] hover:opacity-85 block duration-75 3xl:text-xs"
                  >
                    {page.title ? page.title : page.name}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
