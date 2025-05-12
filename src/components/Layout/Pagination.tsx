import translate from "@/labels";
import CustomIcon from "../Blocks/CustomIcon";

export default function Pagination({
  handleChangePage,
  totals,
  pageSize,
  currentPage,
  locale,
  maxPageButtons = 2,
}) {
  let totalPages = Math.floor(totals / pageSize);
  if (totals % pageSize > 0) {
    totalPages += 1;
  }

  const pages = Array(totalPages)
    .fill(0)
    .map((_, i) => i);

  const handleClick = () => {
    const element = document.getElementById("targetElement");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageChange = (newPage) => {
    handleChangePage(newPage);
    handleClick();
  };

  const classNav =
    "relative z-0 flex justify-center items-center space-x-2 md:space-x-4 pb-12 lg:col-start-2 lg:col-span-3 xl:pb-20";
  const disabled = "cursor-auto opacity-10";
  const classButton =
    "border group border-base-300 size-9 md:w-[60px] md:h-[60px] rounded-full relative duration-300";
  let dotsAdded = false;

  if (pages.length > 1) {
    return (
      <div className="my-20 flex gap-1 justify-center md:col-span-2 text-sm">
        <nav
          onClick={handleClick}
          className={classNav}
          role="navigation"
          aria-label={translate("pagination.title", locale)}
        >
          <button
            onClick={
              currentPage >= 1 ? () => handlePageChange(currentPage - 1) : null
            }
            aria-label={translate("pagination.pagePrev", locale)}
            className={`${
              currentPage >= 1 ? "hover:bg-primary" : disabled
            } ${classButton} bg-secondary md:mr-6`}
          >
            <CustomIcon
              classes="bg-primary group-hover:bg-primary-content size-5 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
              fileName="chevronLeft"
            />
          </button>

          {pages.map((p, index) => {
            if (
              index === 0 ||
              index === totalPages - 1 ||
              (index >= currentPage - Math.floor(maxPageButtons / 2) &&
                index <= currentPage + Math.floor(maxPageButtons / 2))
            ) {
              dotsAdded = false;
              return (
                <button
                  key={p}
                  className={`${
                    p == currentPage
                      ? "bg-accent text-primary border-secondary "
                      : "bg-primary border-secondary hover:bg-secondary/20"
                  } ${classButton}`}
                  onClick={() => handlePageChange(p)}
                  aria-current={p == currentPage ? true : false}
                  aria-label={`${translate("pagination.pageGoTo", locale)} ${
                    p + 1
                  } ${translate("pagination.pageOf", locale)} ${totalPages}`}
                >
                  {p + 1}
                </button>
              );
            } else if (!dotsAdded) {
              dotsAdded = true;
              return (
                <button
                  key={index}
                  className="w-2"
                  disabled
                  aria-disabled="true"
                >
                  ...
                </button>
              );
            }
          })}

          <button
            onClick={
              Number(currentPage) < totalPages
                ? () => handlePageChange(Number(currentPage) + 1)
                : null
            }
            aria-label={translate("pagination.pageNext", locale)}
            className={`${
              Number(currentPage) < totalPages - 1
                ? "hover:bg-primary"
                : disabled
            } ${classButton} bg-primary-content md:!ml-10`}
          >
            <CustomIcon
              classes="bg-secondary-content group-hover:bg-primary-content size-5 absolute inset-1/2 -translate-x-1/2 rotate-180 -translate-y-1/2"
              fileName="chevronRight"
            />
          </button>
        </nav>
      </div>
    );
  }
}
