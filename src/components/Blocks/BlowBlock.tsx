import { motion, Variants } from "framer-motion";
import CustomIcon from "./CustomIcon";
import { SiteLocale } from "@/graphql/generated";
import translate from "@/labels";
import { getDate } from "@/lib/getDate";

type BlowProps = {
  title: string;
  text: string;
  prefix?: string;
  locale: SiteLocale;
  titleSmall?: boolean;
  date?: string;
  endDate?: string;
};

export default function BowBlock({
  locale,
  title,
  text,
  prefix,
  titleSmall,
  date,
  endDate,
}: BlowProps) {
  return (
    <>
      <div className="bg-secondary z-10 rounded-t-full lg:min-h-[460px]">
        <div className="px-8 z-20 relative pb-8 pt-4 md:px-10 lg:pb-0">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="xl:flex xl:justify-between xl:items-end grid gap-2 mx-auto lg:mx-0 inset-0 w-full h-full lg:py-16 md:text-left text-base-100">
                <div className="grid gap-2 xl:gap-6 items-center justify-center lg:px-14 lg:mx-auto">
                  <CustomIcon
                    fileName="logoSmall"
                    classes="bg-accent size-[50px] mx-auto mt-8 mb-4 md:mt-12 lg:mt-4"
                  />
                  {prefix && (
                    <div className="uppercase text-accent text-center">
                      {prefix === "course"
                        ? translate("course.label", locale)
                        : translate(prefix, locale)}
                    </div>
                  )}
                  {date && (
                    <div className="text-center">
                      {date
                        ? endDate
                          ? getDate(date, endDate, locale)
                          : getDate(date, null, locale)
                        : " "}
                    </div>
                  )}
                  {title && (
                    <h2
                      dangerouslySetInnerHTML={{ __html: title }}
                      className={`${
                        titleSmall || date
                          ? "md:text-md lg:text-lg"
                          : "md:text-lg lg:text-2xl"
                      } text-center font-sans text-smd md:px-4`}
                    />
                  )}
                  {text && (
                    <div
                      dangerouslySetInnerHTML={{ __html: text }}
                      className="text-sm pt-4 lg:text-base md:py-6"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
