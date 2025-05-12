import SubMenuItems from "./SubMenuItems";
import CustomIcon from "@/components/Blocks/CustomIcon";
import { motion, useCycle } from "framer-motion";
import { useRef, useEffect } from "react";
export default function DropdownMenu({
  sticky,
  navbarOpen,
  menuItem,
  isMega,
  handleClickAndClose,
  isDropdownOpen,
  setIsDropdownOpen,
}) {
  const [dropdownOpen, toggleOpen] = useCycle(false, true);
  // const containerRef = useRef(null);

  // const dropdownVariants = {
  //   open: {
  //     gridTemplateRows: "1fr",
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.5,
  //     },
  //   },
  //   closed: {
  //     gridTemplateRows: "0fr",
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.35,
  //     },
  //   },
  // };
  // const colorVariants = {
  //   open: {
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.25,
  //     },
  //   },
  //   closed: {
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.25,
  //     },
  //   },
  // };
  // const invertVariants = {
  //   open: {
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.25,
  //     },
  //   },
  //   closed: {
  //     transition: {
  //       ease: "easeOut",
  //       duration: 0.25,
  //     },
  //   },
  // };
  // const handleSubmenu = () => {
  //   if (!isDropdownOpen) {
  //     setIsDropdownOpen(!isDropdownOpen);
  //   }
  //   toggleOpen();
  // };
  // const handleHideDropdown = (event: KeyboardEvent) => {
  //   if (event.key === "Escape") {
  //     if (dropdownOpen) {
  //       toggleOpen();
  //     }
  //     if (isDropdownOpen) {
  //       setIsDropdownOpen(false);
  //     }
  //   }
  // };

  // function useClickOutside(ref: any) {
  //   function handleClickOutside(event: { target: any }) {
  //     if (ref.current && !ref.current.contains(event.target) && dropdownOpen) {
  //       toggleOpen();
  //     }
  //     if (isDropdownOpen) {
  //       setIsDropdownOpen(!isDropdownOpen);
  //     }
  //   }
  //   useEffect(() => {
  //     document.addEventListener("keydown", handleHideDropdown, true);
  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("keydown", handleHideDropdown, true);
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, [ref, dropdownOpen]);
  // }
  // const wrapperRef = useRef(null);
  // useClickOutside(wrapperRef);

  // return;

  return (
    <>
      {/* <motion.button
        animate={sticky || dropdownOpen || navbarOpen ? "open" : "closed"}
        onClick={() => handleSubmenu()}
        variants={colorVariants}
      > */}
      <span
        // ref={wrapperRef}
        className={`lg:text-base lg:uppercase whitespace-nowrap flex gap-x-2 cursor-pointer items-center justify-between text-md lg:mr-0 lg:inline-flex hover:underline underline-offset-8 px-6 lg:px-0 lg:text-secondary-content`}
      >
        {menuItem.title}
        {/* <motion.span
            animate={sticky || navbarOpen ? "open" : "closed"}
            variants={invertVariants}
          > */}
        <CustomIcon classes={`size-8 bg-primary`} fileName="chevron-down" />
        {/* </motion.span> */}
      </span>
      {/* </motion.button> */}

      {/* <motion.div
        animate={dropdownOpen ? "open" : "closed"}
        variants={dropdownVariants}
        className={`submenu relative grid grid-rows-[0fr] ${
          sticky ? "xl:mt-[37px] drop-shadow-md" : "xl:mt-[40px]"
        } lg:-ml-6 min-w-[280px] lg:mt-[38px] px-6 lg:px-2 lg:absolute lg:z-[-1] bg-secondary text-secondary-content`}
      > */}
      <div className="overflow-hidden h-full">
        {menuItem.submenu && (
          <SubMenuItems
            items={menuItem.submenu}
            isMega={isMega}
            handleClickAndClose={handleClickAndClose}
            dropdownOpen={dropdownOpen}
            // handleSubmenu={handleSubmenu}
          />
        )}
      </div>
      {/* </motion.div> */}
    </>
  );
}
