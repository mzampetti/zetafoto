"use client";

import React from "react";
import CustomIcon from "../Blocks/CustomIcon";

type Props = {
  navbarToggleHandler: any;
  navbarOpen: Boolean;
};

const ButtonMenu = ({ navbarToggleHandler, navbarOpen }: Props) => {
  return (
    <button
      onClick={navbarToggleHandler}
      id="navbarToggler"
      aria-label="Mobile Menu"
      className={`${
        navbarOpen ? "text-primary" : "text-secondary"
      } flex text-[16px] items-center xl:hidden justify-center z-10 relative`}
    >
      <span className="uppercase pr-2">{navbarOpen ? "close" : "menu"}</span>
      <CustomIcon
        classes={navbarOpen ? "size-4 bg-primary" : "size-4 bg-secondary"}
        fileName={navbarOpen ? "close" : "hamburger-menu"}
      />
    </button>
  );
};

export default ButtonMenu;
