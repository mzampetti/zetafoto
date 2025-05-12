import { useState, useEffect } from "react";
import { Pagination } from "react-instantsearch";
import { t } from "@/lib/resolveLink";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default function SharedPagination({
  locale,
  isMainSearch = false,
  resLength,
}) {
  const { height, width } = useWindowDimensions();
  const [visiblePages, setVisiblePages] = useState(3);
  useEffect(() => {
    if (width < 479) {
      setVisiblePages(1);
    } else if (width < 1439) {
      setVisiblePages(2);
    } else {
      setVisiblePages(3);
    }
  }, [width]);

  const firstLastClass = isMainSearch ? "hidden" : "hidden md:block";
  const prevNextClass = resLength && resLength <= 3 ? "hidden" : "";
  return (
    <Pagination
      onClick={() => {
        scrollTo(0, 0);
      }}
      padding={visiblePages}
      classNames={{
        root: "",
        list: "flex justify-center lg:justify-start",
        item: "mx-2 group whitespace-nowrap",
        selectedItem:
          "[&_a]:bg-black [&_a]:border-black [&_a]:hover:shadow-[0_3px_6px_0px_rgba(0,0,0,0.3)] text-white font-bold",
        firstPageItem: firstLastClass,
        previousPageItem: prevNextClass,
        pageItem: "",
        disabledItem: "",
        nextPageItem: prevNextClass,
        lastPageItem: firstLastClass,
        link: "py-1 px-2 sm:py-2 sm:px-4 border-[1px] text-sm sm:text-base font-bold rounded-sm hover:border-black py-2 px-4 ",
      }}
      translations={{
        firstPageItemText: t("firstPageItemText", locale),
        previousPageItemText: t("previousPageItemText", locale),
        nextPageItemText: t("nextPageItemText", locale),
        lastPageItemText: t("lastPageItemText", locale),
        pageItemText: ({ currentPage, nbPages }) => `${currentPage}`,
        firstPageItemAriaLabel: t("firstPageItemAriaLabel", locale),
        previousPageItemAriaLabel: t("previousPageItemAriaLabel", locale),
        nextPageItemAriaLabel: t("nextPageItemAriaLabel", locale),
        lastPageItemAriaLabel: t("lastPageItemAriaLabel", locale),
        pageItemAriaLabel: ({ currentPage, nbPages }) =>
          `${t("gotoPage", locale)} ${currentPage} ${t(
            "of",
            locale
          )} ${nbPages}`,
      }}
    />
  );
}
