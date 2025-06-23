"use client";

import { useEffect, useState } from "react";
import GoogleAnalytics from "@/components/Footer/ExternalServices/GoogleAnalytics";
import { SiteLocale } from "@/graphql/generated";
import translate from "@/labels";
import ExternalLink from "@/components/Links/ExternalLink";
import Iubenda from "./ExternalServices/Iubenda";

interface Props {
  lng: SiteLocale;
}

const ENV = process.env.DATO_ENV;

const Footer = ({ lng }: Props) => {
  const iubendaPolicyId = lng === "it" ? "18730586" : "47205885";
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <>
      <footer
        id="footer"
        className="bg-secondary text-primary pt-6 text-center"
      >
        <div className="container text-sm font-light">
          <div className="">
            Copyright 2008-{year} Franco Zampetti,{" "}
            {translate("allRightsReserved", lng)}
          </div>

          <div className="py-8 font-bold underline">
            <a
              href={`https://www.iubenda.com/privacy-policy/${iubendaPolicyId}`}
              title={`Privacy Policy`}
              className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed px-1"
            >
              <span className="hover:underline hover:underline-offset-4 ">
                Privacy Policy
              </span>
            </a>
            <a
              href={`https://www.iubenda.com/privacy-policy/${iubendaPolicyId}/cookie-policy`}
              title={`Cookie Policy`}
              className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed px-1"
            >
              <span className="hover:underline hover:underline-offset-4 ">
                Cookie Policy
              </span>
            </a>
            <a
              href="#"
              title={`Cookie Policy`}
              className="iubenda-cs-preferences-link px-1"
            >
              <span className="hover:underline hover:underline-offset-4 ">
                {translate("preferencePolicy", lng)}
              </span>
            </a>
            <ExternalLink
              title="Instagram Franco Zampetti"
              url="https://www.instagram.com/francozampetti/"
              className="px-1"
            >
              Instagram
            </ExternalLink>
            <ExternalLink
              title="Email Franco Zampetti"
              url="mailto:info@francozampetti.it"
              className="px-1"
            >
              info@francozampetti.it
            </ExternalLink>
          </div>
        </div>
      </footer>
      <Iubenda locale={lng} siteId="309444" policyId="235583" />
      <GoogleAnalytics id="G-3J97LTNFEE" />
    </>
  );
};

export default Footer;
