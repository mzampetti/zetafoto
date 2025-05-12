import { SiteLocale } from "@/graphql/generated";
import translate from "@/labels";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CustomIcon from "../Blocks/CustomIcon";
import InternalLink from "../Links/InternalLink";
import Link from "next/link";

type MenuInternalProps = {
  locale: SiteLocale;
  label: string;
  items: any;
  model?: string;
};

export default function InternalMenu({
  label,
  items,
  locale,
  model,
}: MenuInternalProps) {
  return (
    <Menu
      as="div"
      className="relative block text-left border-y py-8 border-neutral z-20"
    >
      {({ open }) => (
        <>
          <div className="flex gap-2 justify-between flex-wrap">
            <MenuButton className="uppercase border pl-4 pr-3 py-[3px] border-primary-content flex items-center gap-1">
              {translate(label, locale)}
              <CustomIcon
                classes={`bg-primary-content size-8 transform transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
                fileName="chevron-down"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-56 bg-white transition border border-primary-content focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {items.map((i: any) => (
                <MenuItem key={i.id}>
                  <InternalLink
                    record={i}
                    locale={locale}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    {i.title}
                  </InternalLink>
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}
