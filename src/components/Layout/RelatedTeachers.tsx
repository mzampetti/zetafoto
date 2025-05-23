import translate from "@/labels";
import Link from "next/link";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
export default function RelatedTeachers({ locale, evenTeachers, oddTeachers }) {
  return (
    <>
      <div className="grid py-20 gap-12 z-10 relative md:grid-cols-2 md:pt-40 xl:w-[890px] mx-auto items-start px-6">
        <div className="flex md:col-span-2 flex-wrap gap-2 justify-between md:mb-12">
          <h2 className="text-lg font-light md:text-xl font-sans max-w-prose xl:text-2xl">
            {translate("relatedTeachers.title", locale)}
          </h2>
          <Link href={translate("relatedTeachers.url", locale)}>
            <ButtonBlock
              color="dark"
              label={translate("relatedTeachers.cta", locale)}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
