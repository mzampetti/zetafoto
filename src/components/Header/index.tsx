"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import { MenuQuery, SiteLocale } from "@/graphql/generated";
import { motion } from "framer-motion";
import ButtonMenu from "./ButtonMenu";
import CustomIcon from "../Blocks/CustomIcon";
import Image from "next/image";
import resolveLink from "@/lib/resolveLink";
import translate from "@/labels";
import React from "react";

type Props = {
  lng: SiteLocale;
  data: MenuQuery;
  hrefs?: any;
  model: string;
};

const activeClass = "font-bold";
const itemClass =
  "text-lg font-bold xl:text-md hover:underline underline-offset-[16px]";
const itemClassSubmenu =
  "text-md xl:text-base hover:underline underline-offset-[8px] whitespace-nowrap";

const invertVariants = {
  open: { transition: { ease: "easeOut", duration: 0.25 } },
  closed: { transition: { ease: "easeOut", duration: 0.25 } },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1280);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isDesktop;
}

const Header = ({ lng, data, model, hrefs }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: string) =>
    setOpenMenuId((prevId) => (prevId === id ? null : id));

  const handleClickAndClose = () => {
    setNavbarOpen(false);
    setOpenMenuId(null);
  };

  if (!data) return null;

  const menuData = [
    { id: "home", title: "Home", path: "/" },
    {
      id: "photos",
      title: translate("photosTitle", lng),
      path: "",
      submenu: [
        data.buildingCategoriesIndex,
        data.locationsIndex,
        data.citiesIndex,
        data.architectonicStylesIndex,
        data.architectonicElementsIndex,
        data.authorsIndex,
      ].map((item) => ({
        id: item.id,
        title: item.menuLabel,
        path: resolveLink({
          _modelApiKey: item._modelApiKey,
          locale: lng,
        }),
      })),
    },
    ...[
      data.photosCollectionsIndex,
      data.videosIndex,
      data.expositionsIndex,
      data.articlesIndex,
      data.aboutPage,
    ].map((item) => ({
      id: item.id,
      title: item.menuLabel,
      path: resolveLink({ _modelApiKey: item._modelApiKey, locale: lng }),
    })),
  ];

  return (
    <header>
      <div className="header bg-primary content-secondary left-0 flex w-full items-center fixed z-30 border-b border-[#e0e0e0]">
        <div className="relative isolate z-20 w-full py-3 xl:py-0">
          <div className="container">
            <div className="flex items-center justify-between">
              <motion.div
                className="relative"
                animate={navbarOpen ? "open" : "closed"}
                variants={invertVariants}
              >
                <Link href="/" title="home" className="flex items-center">
                  <div className="relative w-[36px] h-[36px] sm:w-[48px] sm:h-[48px]">
                    <Image
                      src="/logo.svg"
                      fill
                      className="object-contain"
                      priority
                      alt="Logo Franco Zampetti"
                    />
                  </div>
                  <div className="pl-2.5 md:pl-4">
                    <div className="text-md md:text-lg font-semibold">
                      Franco Zampetti
                    </div>
                    <div className="text-xs md:text-sm">
                      {translate("subtitleHp", lng)}
                    </div>
                  </div>
                </Link>
              </motion.div>

              <div className="absolute top-20 left-0 right-0 xl:relative xl:top-auto xl:left-auto xl:right-auto xl:flex">
                <div className="xl:flex gap-x-10">
                  <motion.nav
                    initial={false}
                    animate={navbarOpen ? "open" : "closed"}
                    id="navbarCollapse"
                    ref={containerRef}
                    className={`${
                      navbarOpen ? "h-screen xl:h-auto" : "h-0 xl:h-auto"
                    } duration-300`}
                  >
                    <div className="overflow-auto xl:overflow-visible h-full">
                      <ul
                        ref={menuRef}
                        className="block items-center xl:max-w-auto xl:flex xl:gap-x-6 px-6 md:pt-10 xl:pt-0 overflow-auto max-h-[70vh] xl:overflow-visible"
                      >
                        {menuData.map((menuItem) => {
                          const isMega = !!menuItem.submenu;
                          const isOpen = openMenuId === menuItem.id;

                          return (
                            <li
                              key={menuItem.id}
                              className="py-4 xl:py-6 relative"
                            >
                              <Link
                                href={menuItem.path}
                                title={menuItem.title}
                                onClick={() => toggleMenu(menuItem.id)}
                                className={`flex items-center justify-center w-full text-center ${
                                  pathname === menuItem.path ? activeClass : ""
                                } ${itemClass}`}
                              >
                                {menuItem.title}
                                {isMega && (
                                  <CustomIcon
                                    classes="size-4 ml-1 mt-1 hidden xl:block bg-secondary"
                                    fileName="angle_down"
                                  />
                                )}
                              </Link>
                              {isMega && (
                                <motion.ul
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={
                                    isDesktop
                                      ? isOpen
                                        ? { opacity: 1, height: "auto" }
                                        : { opacity: 0, height: 0 }
                                      : { opacity: 1, height: "auto" }
                                  }
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                  }}
                                  className="overflow-hidden px-2 xl:px-10 xl:pb-6 pt-6 xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:top-[73px] xl:bg-base-200 z-10 text-center xl:w-auto"
                                >
                                  {menuItem.submenu?.map((s) => (
                                    <li key={s.id} className="py-2">
                                      <Link
                                        href={s.path}
                                        title={s.title}
                                        className={`${
                                          pathname === s.path ? activeClass : ""
                                        } ${itemClassSubmenu}`}
                                        onClick={handleClickAndClose}
                                      >
                                        {s.title}
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.nav>
                </div>
                <LanguageSelector
                  lng={lng}
                  languages={data._site.locales}
                  model={model}
                  hrefs={hrefs}
                />
              </div>
              <ButtonMenu
                navbarToggleHandler={() => setNavbarOpen((open) => !open)}
                navbarOpen={navbarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
