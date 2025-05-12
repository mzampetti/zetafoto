import { convertToSlug } from "@/lib/convertToSlug";

type PropsMenuInternal = {
  navItems: string[];
};

const classLink =
  "hover:border-primary-content hover:bg-base-100 duration-150 py-1.5 px-4 xl:block rounded-full border border-primary-content/20 text-xs md:text-sm";

const MenuInternal = ({ navItems }: PropsMenuInternal) => {
  return (
    <>
      <nav className="bg-base-300">
        <div className="container px-6">
          <div className="flex gap-y-4 gap-x-2 py-8 flex-wrap justify-center">
            {navItems.map((n: string, i: number) => (
              <a
                href={`#${convertToSlug(n)}`}
                className={classLink}
                key={`ID${i}`}
              >
                <div className="whitespace-nowrap">{n}</div>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuInternal;
