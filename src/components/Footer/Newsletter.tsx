import CustomIcon from "@/components/Blocks/CustomIcon";
import translate from "@/labels";
import { SiteLocale } from "@/graphql/generated";

type PropsNewsletter = {
  title: string;
  subtitle: string;
  url: string;
  locale: SiteLocale;
};

export default function Newsletter({
  title,
  subtitle,
  url,
  locale,
}: PropsNewsletter) {
  return (
    <>
      <section className="z-0 relative bg-primary text-primary-content md:py-12 border-t border-base-100">
        <div className="xl:col-span-5 container md:pt-12 lg:grid lg:grid-cols-12 xl:pb-12">
          <h2 className="uppercase mb-4 xl:mb-0 lg:col-span-3 xl:col-span-4">
            {title}
          </h2>
          <div className="lg:col-span-9 xl:col-span-8">
            {subtitle && (
              <div
                className="text-smd font-sans italic md:text-lg md:pt-4 lg:pt-0"
                dangerouslySetInnerHTML={{ __html: `${subtitle}` }}
              />
            )}
            <div id="mc_embed_signup">
              <form
                action={url}
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
              >
                <div className="py-4" id="mc_embed_signup_scroll">
                  <div className="mc-field-group">
                    <label htmlFor="mce-EMAIL" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      required={true}
                      defaultValue=""
                      name="EMAIL"
                      placeholder="Inserisci la tua email *"
                      className="block w-full border-primary-content border-b bg-transparent py-4 text-base-content placeholder:text-[#4A4A4A] font-sans"
                      id="mce-EMAIL"
                    />
                  </div>

                  <div id="mce-responses" className="clear foot md:mt-10">
                    <div className="hidden" id="mce-error-response"></div>
                    <div className="hidden" id="mce-success-response"></div>
                  </div>
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="b_b43a7bd9734c7124b3be52921_1911023b36">
                      b_b43a7bd9734c7124b3be52921_1911023b36
                    </label>
                    <input
                      type="text"
                      name="b_b43a7bd9734c7124b3be52921_1911023b36"
                      tabIndex={-1}
                      defaultValue=""
                      id="b_b43a7bd9734c7124b3be52921_1911023b36"
                    />
                  </div>
                  <div id="mergeRow-gdpr">
                    <div className="mb-2 mt-4">
                      <fieldset
                        className="flex items-start gap-2"
                        name="interestgroup_field"
                        role="group"
                        aria-label={translate(
                          "newsletter.privacyFieldsetLabel",
                          locale
                        )}
                      >
                        <legend className="hidden">
                          {translate("newsletter.privacyFieldsetLabel", locale)}
                        </legend>
                        <input
                          type="checkbox"
                          className="checkbox-custom"
                          defaultValue="Y"
                          name="gdpr[150837]"
                          id="gdpr_150837"
                          required
                        />
                        <label
                          className="cursor-pointer text-xs"
                          htmlFor="gdpr_150837"
                        >
                          {translate("newsletter.accept", locale)}
                          <a
                            // href="https://www.datocms-assets.com/65765/1652793060-privacy-e-policy.pdf"
                            title={`Privacy Policy ${translate(
                              "externaLink",
                              locale
                            )}`}
                            target="_blank"
                            className="mx-1 underline"
                            rel="noreferrer noopener"
                          >
                            {translate("newsletter.policy", locale)}
                          </a>
                          {translate("newsletter.authorize", locale)}
                        </label>
                      </fieldset>
                    </div>
                    <div className="mb-2">
                      <fieldset
                        className="flex items-center gap-2"
                        name="interestgroup_field"
                        role="group"
                        aria-label={translate(
                          "newsletter.formAcceptFieldsetLabel",
                          locale
                        )}
                      >
                        <legend className="hidden">
                          {translate(
                            "newsletter.formAcceptFieldsetLabel",
                            locale
                          )}
                        </legend>
                        <input
                          type="checkbox"
                          className="checkbox-custom"
                          defaultValue="Y"
                          name="gdpr[150845]"
                          id="gdpr_150845"
                          required
                        />
                        <label
                          className="cursor-pointer text-xs"
                          htmlFor="gdpr_150845"
                        >
                          {translate("newsletter.acceptEmail", locale)}
                        </label>
                      </fieldset>
                    </div>
                    <p className="mt-2 mb-4 text-xs">
                      {translate("newsletter.unsubscribePre", locale)}
                      <a
                        href="https://mailchimp.com/legal/terms"
                        className="ml-1 underline duration-200 hover:text-red"
                        target="_blank"
                        rel="noreferrer noopener"
                        title={`legal terms mailchimp ${translate(
                          "externaLink",
                          locale
                        )}`}
                      >
                        {translate("newsletter.cta", locale)}
                      </a>
                    </p>
                  </div>
                  <div className="optionalParent inline-block">
                    <div className="bg-primary-content hover:text-primary-content hover:bg-transparent cursor-pointer flex items-center text-accent-content py-2 px-6 group duration-300 border border-primary-content lg:mt-4">
                      <input
                        aria-label="undefined"
                        type="submit"
                        defaultValue={translate("newsletter.subscribe", locale)}
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="uppercase cursor-pointer"
                      />
                      <CustomIcon
                        classes="bg-primary size-6 ml-3 group-hover:bg-primary-content duration-300"
                        fileName="arrow-right"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
