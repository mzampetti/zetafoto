import { SiteLocale } from "@/graphql/generated";
import Script from "next/script";
import colorsTheme from "@/data/colorsTheme.json";

type PropsIubenda = {
  siteId: string;
  policyId: string;
  locale: SiteLocale;
};

export default function Iubenda({ siteId, policyId, locale }: PropsIubenda) {
  return (
    <>
      <Script
        id="iubenda-cs"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "askConsentAtCookiePolicyUpdate":true,
            "countryDetection":true,
            "enableFadp":true,
            "enableLgpd":true,
            "lgpdAppliesGlobally":false,
            "perPurposeConsent":true,
            "whitelabel":true,
            "purposes":"1, 3, 4",
            "siteId":${siteId},
            "cookiePolicyId":${policyId},
            "lang":"${locale}",
            "banner":{
              "prependOnBody":true,
              "listPurposes":true,
              "showPurposesToggles":true,
              "explicitWithdrawal":true,
              "acceptButtonDisplay":true,
              "closeButtonDisplay":false,
              "customizeButtonDisplay":true,
              "position":"bottom",
              "acceptButtonColor":"black",
              "acceptButtonCaptionColor":"white",
              "customizeButtonColor":"black",
              "customizeButtonCaptionColor":"white",
              "rejectButtonColor":"#0073CE",
              "rejectButtonCaptionColor":"white",
              "textColor":"white",
              "backgroundColor":"#1d1d1b",
            }
          }`,
        }}
      />
      <Script
        id="iubenda-cs-1"
        type="text/javascript"
        src={`https://cs.iubenda.com/autoblocking/${siteId}.js`}
      />
      <Script
        id="iubenda-cs-2"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="lazyOnload"
      />
      <Script
        id="active-modal-cookie"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);`,
        }}
      />
    </>
  );
}
