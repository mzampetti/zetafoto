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
      aria-expanded={navbarOpen ? "true" : "false"}
      className={`${
        navbarOpen ? "text-primary" : "text-secondary"
      } flex text-[16px] items-center xl:hidden justify-center z-10 relative`}
    >
      <CustomIcon
        classes="size-6 bg-secondary"
        fileName={navbarOpen ? "close-menu-mobile" : "hamburger"}
      />
    </button>
  );
};

export default ButtonMenu;
