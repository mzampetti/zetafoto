import translate from "@/labels";
import { t } from "@/lib/resolveLink";
import Link from "next/link";

export default function MagazineSubscription({ locale, page }) {
  return (
    <>
      <div className="text-secondary-content bg-secondary py-12 z-10 relative md:py-16 xl:py-32">
        <div className="container">
          <div className="max-w-[900px] mx-auto">
            <div className="md:flex md:gap-x-4 xl:gap-x-8 xl:pt-8 justify-center">
              <div className="bg-base-300/30 p-6 relative border border-base-300 lg:w-2/3 xl:w-1/2 lg:min-h-[450px]">
                <div className="font-sans text-[#E0CFA8] text-smd min-h-20 md:min-h-32 lg:text-lg">
                  {page.title}
                </div>
                <div
                  className="mb-8"
                  dangerouslySetInnerHTML={{ __html: page.abstract }}
                />
                {page.price && (
                  <div>
                    <div className="">
                      € <strong>{page.price},00</strong>
                    </div>
                    <a
                      href="#"
                      className="border pl-4 pr-4 py-1 my-4 inline-flex items-center justify-center"
                      data-item-id={`${page._modelApiKey}-${page.id}`}
                      data-item-name={page.title}
                      data-item-price={`${page.price}`}
                      data-item-url={`/${locale}/${t(`cultura`, locale)}/${t(
                        `rivista-jacquard`,
                        locale
                      )}`}
                      data-item-weight="0"
                    >
                      {locale === "it" ? "Abbonati" : "Subscribe"}
                    </a>
                  </div>
                )}
                {translate("purchase.offline", locale)}
                <span>
                  {locale === "it" ? "Acquisto offline" : "Offline purchase"}
                </span>
                <Link
                  href={`/${locale}/${t(`contatti`, locale)}/`}
                  title={locale === "it" ? "Contattaci" : "Contact us"}
                >
                  {locale === "it" ? "Contattaci" : "Contact us"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
