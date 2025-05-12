"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; // Importa il nuovo hook
import LanguageSelector from "./LanguageSelector";
import { MenuQuery, SiteLocale } from "@/graphql/generated";
import { motion } from "framer-motion";
import ButtonMenu from "./ButtonMenu";
import CustomIcon from "../Blocks/CustomIcon";
import SearchInput from "../Layout/searchInput";
import { SRCImage } from "react-datocms";
import Socials from "../Footer/Socials";
import Image from "next/image";

type Props = {
  lng: SiteLocale;
  data: MenuQuery;
  hrefs?: any;
};

const activeClass = "text-accent underline";
const itemClass =
  "xl:text-base flex gap-x-2 cursor-pointer whitespace-nowrap items-center justify-between xl:mr-0 xl:inline-flex hover:underline underline-offset-8 xl:text-secondary-content xl:text-base";

const invertVariants = {
  open: { transition: { ease: "easeOut", duration: 0.25 } },
  closed: { transition: { ease: "easeOut", duration: 0.25 } },
};

const colorVariants = {
  open: { transition: { ease: "easeOut", duration: 0.25 } },
  closed: { transition: { ease: "easeOut", duration: 0.25 } },
};

const Header = ({ lng, hrefs, data }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleStickyNavbar = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const handleClickAndClose = () => {
    setNavbarOpen(false);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  if (!data) return null;

  const menuData = [
    {
      id: data.companyPage.id,
      title: data.companyPage.title,
      path: `/${lng}/${data.companyPage.slug}`,
    },
    {
      id: data.productsPage.id,
      title: data.productsPage.title,
      path: `/${lng}/${data.productsPage.slug}`,
      submenu: [
        ...data.allTechniques.map((technique) => ({
          id: technique.id,
          title: technique.name,
          path: `/${lng}/t/${technique.slug}`,
          menuImage: true,
        })),
        ...data.allCategories.map((category) => ({
          id: category.id,
          title: category.name,
          path: `/${lng}/c/${category.slug}`,
          menuImage: true,
        })),
      ],
    },
    {
      id: data.newsPage.id,
      title: data.newsPage.title,
      path: `/${lng}/${data.newsPage.slug}`,
    },
    {
      id: data.contactPage.id,
      title: data.contactPage.title,
      path: `/${lng}/${data.contactPage.slug}`,
    },
  ];
  // return console.log("menuData:", menuData);

  return (
    <header>
      <div
        className={`${
          sticky ? "xl:-mt-5" : ""
        } header xl:bg-secondary bg-white left-0 flex w-full items-center fixed z-30 duration-300`}
      >
        <div
          className={`relative isolate z-20 w-full py-2 xl:py-0 motion-safe:duration-300`}
        >
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="">
                <div className="xl:flex gap-x-10">
                  <ButtonMenu
                    navbarToggleHandler={navbarToggleHandler}
                    navbarOpen={navbarOpen}
                  />
                  <motion.div
                    className={`${
                      sticky
                        ? "xl:scale-75 xl:translate-y-3"
                        : "xl:translate-y-[30px]"
                    } w-[190px] h-[75px] z-10 duration-300 flex-none relative mx-auto hidden xl:block`}
                    animate={sticky || navbarOpen ? "open" : "closed"}
                    variants={invertVariants}
                    aria-hidden={true}
                  >
                    <Link
                      href="/"
                      title="home"
                      className="header-logo block w-full h-full"
                    >
                      <SRCImage
                        priority
                        className="!w-full !h-full inset-0 !object-contain"
                        data={data.siteInfo.logoWhite.responsiveImage}
                      />
                    </Link>
                  </motion.div>

                  <motion.nav
                    initial={false}
                    animate={isDropdownOpen ? "open" : "closed"}
                    id="navbarCollapse"
                    ref={containerRef}
                    className={`absolute top-0 right-0 z-[0] w-full bg-secondary text-secondary-content motion-safe:duration-[.75s] xl:visible xl:static xl:w-auto xl:border-none xl:!bg-transparent grid ${
                      navbarOpen
                        ? "h-screen xl:h-auto after:translate-y-0 after:shadow-primary"
                        : "h-0 xl:h-auto"
                    }`}
                  >
                    <div className="overflow-auto xl:overflow-visible h-full">
                      <ul
                        className={`${
                          sticky
                            ? "xl:text-primary-content"
                            : "xl:text-base-content"
                        } block text-secondary-content items-center xl:max-w-auto pt-16 xl:pt-6 pb-4 xl:pb-0 xl:flex xl:gap-x-12 px-6`}
                      >
                        <li className="xl:hidden w-full my-4">
                          <SearchInput locale={lng} />
                        </li>
                        {menuData.map((menuItem) => {
                          const [isHovered, setIsHovered] = useState(false);
                          const isMega = menuItem.submenu;
                          return (
                            <li
                              key={menuItem.id}
                              className="py-3"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <Link
                                href={menuItem.path}
                                title={menuItem.title}
                                className={`${
                                  pathname === menuItem.path ? activeClass : ""
                                } ${itemClass}`}
                                onClick={handleClickAndClose}
                              >
                                {menuItem.title}
                                {isMega && (
                                  <CustomIcon
                                    classes="size-8 hidden xl:block bg-white"
                                    fileName="chevron-down"
                                  />
                                )}
                              </Link>
                              {isMega && (
                                <motion.ul
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: isHovered ? 1 : 0,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                  }}
                                  className={`px-2 xl:px-0 pl-8 pt-4 xl:absolute xl:left-0 xl:top-[80px] xl:right-0 xl:bg-white xl:border-b xl:pt-12 z-10 xl:pb-12 xl:container ${
                                    isHovered ? "block" : "hidden"
                                  }`}
                                >
                                  <div className="">
                                    <div className="grid xl:grid-cols-8 xl:items-start">
                                      <div
                                        aria-hidden="true"
                                        className="relative w-full h-1/2 hidden xl:block"
                                      >
                                        <Image
                                          src={data.siteInfo.tecniquesIcon.url}
                                          alt="icon"
                                          title="icon"
                                          aria-hidden="true"
                                          className="object-contain"
                                          layout="fill"
                                        />
                                      </div>
                                      <div className="xl:col-span-2">
                                        <div className="font-bold text-sm hidden xl:block mb-2">
                                          {lng === "it"
                                            ? "Per tecnica"
                                            : "For technique"}
                                        </div>
                                        <div className="xl:grid xl:grid-cols-2 gap-x-6">
                                          {menuItem.submenu
                                            .filter((subItem) =>
                                              subItem.path.includes("/t/")
                                            )
                                            .map((subItem) => (
                                              <li
                                                key={subItem.id}
                                                className="py-1 hover:text-accent before:bg-white before:size-1 before:rounded-full flex items-center gap-2 text-sm xl:before:hidden"
                                              >
                                                <Link
                                                  href={subItem.path}
                                                  className="block"
                                                  title={subItem.title}
                                                >
                                                  {subItem.title}
                                                </Link>
                                              </li>
                                            ))}
                                        </div>
                                      </div>
                                      <div
                                        aria-hidden="true"
                                        className="relative w-full h-1/2 hidden xl:block"
                                      >
                                        <Image
                                          src={data.siteInfo.categoriesIcon.url}
                                          alt="icon"
                                          title="icon"
                                          aria-hidden="true"
                                          className="object-contain"
                                          layout="fill"
                                        />
                                      </div>
                                      <div className="xl:col-span-4 hidden xl:block">
                                        <div className="font-bold text-sm mb-2 ">
                                          {lng === "it"
                                            ? "Per Categoria"
                                            : "For category"}
                                        </div>
                                        <div className="xl:grid xl:grid-cols-4 items-start gap-x-6">
                                          {menuItem.submenu
                                            .filter((subItem) =>
                                              subItem.path.includes("/c/")
                                            )
                                            .map((subItem) => (
                                              <li
                                                key={subItem.id}
                                                className="py-1 hover:text-accent before:bg-white before:size-1 before:rounded-full flex items-center gap-2 text-sm xl:before:hidden"
                                              >
                                                <Link
                                                  href={subItem.path}
                                                  className="block"
                                                  title={subItem.title}
                                                >
                                                  {subItem.title}
                                                </Link>
                                              </li>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* </ul> */}
                                </motion.ul>
                              )}
                            </li>
                          );
                        })}
                        <li className="xl:hidden">
                          <LanguageSelector
                            hrefs={hrefs}
                            lng={lng}
                            languages={data._site.locales || []}
                            sticky={sticky}
                            navbarOpen={navbarOpen}
                            isDropdownOpen={isDropdownOpen}
                          />
                        </li>
                        <li className="xl:hidden">
                          <Socials locale={lng} />
                        </li>
                      </ul>
                    </div>
                  </motion.nav>
                </div>
              </div>

              <div className="flex justify-center xl:w-full xl:justify-end lg:w-[67%] lg:justify-between">
                <motion.div
                  className="w-[120px] h-[44px] xl:w-[190px] xl:h-[75px] xl:mr-12 flex-none relative mx-auto xl:hidden"
                  animate={sticky || navbarOpen ? "open" : "closed"}
                  variants={invertVariants}
                >
                  <Link
                    href="/"
                    className="header-logo block w-full h-full xl:hidden"
                    title="home"
                  >
                    <SRCImage
                      priority
                      className="!w-full !h-full inset-0 !object-contain"
                      data={data.siteInfo.logoHome.responsiveImage}
                    />
                  </Link>
                </motion.div>
                <div className="hidden md:flex xl:items-end xl:translate-y-0.5">
                  <div className="md:flex w-full justify-end md:justify-start md:flex-row-reverse items-center gap-x-3 pl-4">
                    <SearchInput locale={lng} />
                  </div>
                  <li className="hidden xl:block xl:pl-6 xl:translate-y-0.5">
                    <LanguageSelector
                      hrefs={hrefs}
                      lng={lng}
                      languages={data._site.locales || []}
                      sticky={sticky}
                      navbarOpen={navbarOpen}
                      isDropdownOpen={isDropdownOpen}
                    />
                  </li>
                  <li className="hidden xl:block">
                    <Socials locale={lng} />
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
