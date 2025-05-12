import { CategoryRecord, SiteLocale } from "@/graphql/generated";
import React, { useEffect, useRef, useState } from "react";

let useClickOutside = (handler) => {
  let domNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

interface GenericPageProps {
  locale: SiteLocale;
  categories: any;
  slug: string;
  currentCat: string;
  tmp: string;
}

const Dropdown = ({
  locale,
  tmp,
  categories,
  currentCat,
  slug,
}: GenericPageProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  return (
    <>
      <div className="flex flex-wrap text-secondary w-full md:w-[600px]">
        <div ref={domNode} className="w-full">
          <div className="text-center w-full">
            <div className="relative inline-block mb-8 text-left bg-secondary/5 w-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center justify-between w-full rounded-[5px] px-5 py-[13px] bg-dark dark:bg-dark-2 text-base font-medium`}
              >
                {currentCat
                  ? currentCat
                  : locale === "it"
                  ? "Filtra per categoria:"
                  : "Filter by category:"}
                <span className="pl-4">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                  </svg>
                </span>
              </button>
              <div
                className={`shadow-1 max-h-[500px] md:max-h-none overflow-scroll md:overflow-auto dark:shadow-box-dark absolute left-0 z-40 w-full bg-secondary text-white dark:bg-dark-2 py-[10px] transition-all md:grid md:grid-cols-2 ${
                  dropdownOpen
                    ? "top-full opacity-100 visible"
                    : "top-[110%] invisible opacity-0"
                }`}
              >
                {categories.map((c: CategoryRecord, i: number) => (
                  <DropdownItem
                    label={c.name}
                    href={`/${locale}/${slug}/${c.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;

const DropdownItem = ({ label, href }) => {
  return (
    <a href={href} className="block py-2 px-5 text-sm hover:text-accent">
      {label}
    </a>
  );
};
