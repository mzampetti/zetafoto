"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Iubenda from "@/components/Footer/ExternalServices/Iubenda";
import GoogleAnalytics from "@/components/Footer/ExternalServices/GoogleAnalytics";
import {
  CategoryRecord,
  LegislationPageRecord,
  SiteLocale,
  TechniqueRecord,
} from "@/graphql/generated";
import translate from "@/labels";
import InternalLink from "../Links/InternalLink";
import Socials from "./Socials";
import ExternalLink from "@/components/Links/ExternalLink";
import ButtonBlock from "@/components/Blocks/ButtonBlock";
import CustomIcon from "../Blocks/CustomIcon";

interface Props {
  lng: SiteLocale;
  data: any;
}

const ENV = process.env.DATO_ENV;

const Footer = ({ data, lng }: Props) => {
  const {
    siteInfo,
    allTechniques,
    allCategories,
    allLegislationPages,
    homepage,
  } = data;
  const iubendaPolicyId = lng === "it" ? "18730586" : "47205885";
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="bg-secondary text-white pt-6">
        <div className="container py-6 xl:pb-12">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 items-start lg:gap-x-12 xl:grid-cols-12">
            <div className="grid gap-6 gap-y-2 grid-cols-2 xl:col-span-3 xl:gap-y-3">
              <div className="font-semibold mb-2 tracking-wider col-span-2">
                {lng === "it" ? "Per tecnica" : "For technique"}
              </div>
              {allTechniques.map((t: TechniqueRecord) => (
                <InternalLink
                  className="text-xs font-light hover:underline underline-offset-2 hover:opacity-80 duration-200"
                  record={t}
                  key={t.id}
                  locale={lng}
                >
                  {t.name}
                </InternalLink>
              ))}
            </div>
            <div className="xl:gap-y-3 grid gap-6 gap-y-2 grid-cols-2 xl:grid-cols-3 items-start xl:col-span-6 xl:pl-12">
              <div className="font-semibold mb-2 tracking-wider col-span-2 mt-12 md:mt-0 items-start xl:col-span-3">
                {lng === "it" ? "Per categoria" : "For category"}
              </div>
              {allCategories.map((c: CategoryRecord) => (
                <InternalLink
                  className="text-xs font-light hover:underline underline-offset-2 hover:opacity-80 duration-200"
                  record={c}
                  key={c.id}
                  locale={lng}
                >
                  {c.name}
                </InternalLink>
              ))}
              <div className="font-semibold mb-2 tracking-wider col-span-2 mt-12 items-start xl:col-span-3">
                {lng === "it" ? "Normative" : "Legislations"}
              </div>
              {allLegislationPages.map((l: LegislationPageRecord) => (
                <InternalLink
                  className="text-xs font-light hover:underline underline-offset-2 hover:opacity-80 duration-200 xl:col-span-3"
                  record={l}
                  key={l.id}
                  locale={lng}
                >
                  {l.title}
                </InternalLink>
              ))}
            </div>
            <div className="md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:grid-cols-1 lg:pl-8 xl:col-span-3">
              <div className="">
                <div className="font-semibold mb-2 tracking-wider col-span-2 mt-12 lg:mt-0">
                  {lng === "it" ? "Seguici sui social" : "Follow us"}
                </div>
                <Socials locale={lng} variant />
              </div>
              <div className="">
                <div className="font-semibold mb-2 tracking-wider col-span-2 mt-12">
                  {lng === "it" ? "Cataloghi" : "Catalogs"}
                </div>
                <div className="gap-x-12 flex flex-wrap">
                  <ExternalLink
                    url={homepage.splash1Catalogue1Pdf.url}
                    className="group"
                  >
                    <ButtonBlock
                      label={homepage.splash1Cta1Text}
                      icon="download"
                    />
                  </ExternalLink>
                  <ExternalLink
                    url={homepage.splash1Catalogue2Pdf.url}
                    className="group"
                  >
                    <ButtonBlock
                      label={homepage.splash1Cta2Text}
                      icon="download"
                    />
                  </ExternalLink>
                  <ExternalLink
                    url={homepage.splash1Catalogue3Pdf.url}
                    className="group"
                  >
                    <ButtonBlock
                      label={homepage.splash1Cta3Text}
                      icon="download"
                    />
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1F3A98] py-6">
          <div className="container text-xs flex flex-wrap gap-2 font-light justify-between">
            <div className="">
              © Copyright 2008 - {year} - Stoppioni S.N.C. Via Ugo La Malfa 20 -
              Signa (FI) - Italy - PI 04501010484
            </div>
            <div className="">
              <ExternalLink
                url="https//www.cantierecreativo.net"
                title="Cantiere Creativo Agenzia web Firenze"
                locale={lng}
                className="hover:underline hover:underline-offset-4"
              >
                Design & dev Cantiere Creativo
              </ExternalLink>
              <span className="px-1"> - </span>
              <ExternalLink
                url="https://www.datocms.com"
                title="DatoCMS headless CMS"
                locale={lng}
                className="hover:underline hover:underline-offset-4"
              >
                Made with DatoCMS
              </ExternalLink>
            </div>
            <div className="">
              <a
                href={`https://www.iubenda.com/privacy-policy/${iubendaPolicyId}`}
                title={`Privacy Policy`}
                className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
              >
                <span className="hover:underline hover:underline-offset-4 ">
                  Privacy Policy
                </span>
              </a>
              <span className="px-1"> - </span>
              <a
                href={`https://www.iubenda.com/privacy-policy/${iubendaPolicyId}/cookie-policy`}
                title={`Cookie Policy`}
                className="iubenda-nostyle no-brand iubenda-noiframe iubenda-embed"
              >
                <span className="hover:underline hover:underline-offset-4 ">
                  Cookie Policy
                </span>
              </a>
              <span className="px-1"> - </span>
              <a
                href="#"
                title={`Cookie Policy`}
                className="iubenda-cs-preferences-link"
              >
                <span className="hover:underline hover:underline-offset-4 ">
                  {translate("preferencePolicy", lng)}
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Iubenda
        locale={lng}
        siteId="995589"
        policyId={lng === "it" ? "18730586" : "47205885"}
        colorRev={true}
      />
      <GoogleAnalytics id="G-LH8Q2CCNVD" />
    </>
  );
};

export default Footer;
