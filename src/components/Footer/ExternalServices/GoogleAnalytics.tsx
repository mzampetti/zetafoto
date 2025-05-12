import Script from "next/script";

export default function GoogleAnalytics({ id }) {
  return (
    <>
      <Script
        id="gtm"
        async={true}
        type="plain/text"
        className="_iub_cs_activate"
        data-iub-purposes="4"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="gas"
        type="plain/text"
        className="_iub_cs_activate"
        data-iub-purposes="4"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  );
}
