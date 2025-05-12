"use client";

import { SRCImage } from "react-datocms";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomIcon from "../Blocks/CustomIcon";

export const MenuItem = ({
  submenuItem,
  // handleSubmenu,
  handleClickAndClose,
  isMega,
  dropdownOpen,
}) => {
  const imageVariants = {
    open: {
      bottom: 0,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
    closed: {
      bottom: "100%",
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };
  const titleVariants = {
    open: {
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };
  return (
    <li>
      <Link
        tabIndex={dropdownOpen ? 0 : -1}
        href={submenuItem.path}
        className="group"
        onClick={() => handleClickAndClose()}
        title="products"
      >
        <div className="flex items-center my-2">
          <motion.div
            variants={titleVariants}
            className={`text-accent-content text-base lg:normal-case py-1 whitespace-nowrap ${
              isMega ? "" : "hover:underline hover:underline-offset-8"
            }`}
          >
            {submenuItem.title}
            {submenuItem.model}
            {isMega && (
              <CustomIcon
                fileName="arrow-oblique"
                classes="w-[14px] h-[14px] bg-base-content ml-2 group-hover:ml-6 inline-block motion-safe:duration-300"
              />
            )}
          </motion.div>
        </div>
      </Link>
    </li>
  );
};

export default function SubMenuItems({
  items,
  isMega,
  handleClickAndClose,
  handleSubmenu,
}: any) {
  const variants = {
    open: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    closed: {
      transition: {
        ease: "easeOut",
        staggerChildren: 0,
        staggerDirection: -1,
      },
    },
  };
  const colClass = {
    3: "grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <motion.ul
      variants={variants}
      className={`${
        isMega
          ? "mx-0 lg:ml-auto lg:mt-[105px] lg:container pt-6 pb-8 grid justify-center gap-5" +
            " " +
            colClass[items.length]
          : "lg:px-4 lg:py-2"
      }`}
    >
      {items?.map((submenuItem: any, dropdownOpen: boolean) => {
        return (
          <MenuItem
            key={submenuItem.id}
            submenuItem={submenuItem}
            isMega={isMega}
            handleClickAndClose={handleClickAndClose}
            dropdownOpen={dropdownOpen}
          />
        );
      })}
    </motion.ul>
  );
}
