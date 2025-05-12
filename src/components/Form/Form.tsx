import React from "react";
import { SiteLocale } from "@/graphql/generated";
import translate from "@/labels";
import ExternalLink from "@/components/Links/ExternalLink";
import FormMessage from "@/components/Form/FormMessage";
import CheckboxCustom from "@/components/Form/CheckboxCustom";
import ButtonBlock from "../Blocks/ButtonBlock";

type PropsContactForm = {
  locale: SiteLocale;
};

const ContactForm = ({ locale }: PropsContactForm) => {
  const formWebhook = "7fc3bc1d-62ee-4f28-aed6-021cf0619189";
  const labelClass = "sr-only";
  const inputClass =
    "w-full placeholder:text-black font-sans text-black p-3 border border-primary-content bg-transparent";
  const checkboxClass =
    "h-4 w-4 shrink-0 rounded-full bg-white text-black accent-black";

  const [result, setResult] = React.useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("sending");
    const formData = new FormData(event.target);

    formData.append("access_key", formWebhook);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("success");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult("error");
    }
  };

  return (
    <form className="mt-8" onSubmit={onSubmit}>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="antiSpam">AntiSpam</label>
        <input type="text" name="antiSpam" id="antiSpam" required={false} />
        <input type="hidden" name="access_key" value={formWebhook} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            {translate("formFullName", locale)}
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            autoComplete="given-name"
            placeholder={translate("formFullName", locale)}
            required={true}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            {translate("formLastName", locale)}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            autoComplete="family-name"
            placeholder={translate("formLastName", locale)}
            required={true}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            required={true}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {translate("formPhoneNumber", locale)}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            placeholder={translate("formPhoneNumber", locale)}
            required={true}
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="message" className={`${labelClass}`}>
            {translate("formMessage", locale)}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={translate("formMessage", locale)}
            required={true}
            className={`${inputClass} h-24 xl:h-40 border-b border-pink`}
          />
        </div>
        <fieldset
          className="mt-3 flex items-center"
          role="group"
          aria-label={translate("formPrivacyFieldsetLabel", locale)}
        >
          <legend className="sr-only">
            {translate("formPrivacyFieldsetLabel", locale)}
          </legend>
          <input
            id="privacyCheckbox"
            type="checkbox"
            value=""
            required={true}
            className="checkbox-custom"
          />
          <CheckboxCustom />
          <label htmlFor="privacyCheckbox" className="ml-2 text-sm font-sans">
            {translate("formPrivacyPre", locale)}
            <ExternalLink
              label={"Privacy Policy"}
              url={`//www.iubenda.com/privacy-policy/${translate(
                "cookiePolicyId",
                locale
              )}`}
              className="iubenda-nostyle no-brand iubenda-embed iubenda-noiframe underline font-extra-bold"
            >
              {"Privacy Policy"}
            </ExternalLink>
            {translate("formPrivacyAfter", locale)}
          </label>
        </fieldset>
        <FormMessage status={result} locale={locale} />
        {result !== "error" && result !== "success" && (
          <div className="mt-6 md:flex md:justify-end md:mt-3">
            <button className="group" type="submit">
              <ButtonBlock color="dark" label={translate("formSend", locale)} />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
