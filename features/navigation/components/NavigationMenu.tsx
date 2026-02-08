import Link from "next/link";
import React from "react";

const MenuItemProps = {
  label: "Home",
  link: "/home",
};

const NavigationMenuItem = ({
  label = "label",
  link = "#",
  active = false,
}: {
  label: string;
  link: string;
  active?: boolean;
}) => {
  return (
    <Link
      href={link}
      className={`capitalize text-[18px] font-bold px-5 py-[10px] rounded-[100px] w-fit 
         transition-all duration-200
        ${
          active ? "bg-primary-500 hover:bg-primary-600" : "hover:bg-light-200"
        }    `}
    >
      {label}
    </Link>
  );
};

NavigationMenuItem.defaultProps = MenuItemProps;

//Main Navigation Menu Component

const NavigationMenu = ({
  items,
}: {
  items: {
    label: string;
    link: string;
    active?: boolean;
  }[];
}) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <div className="space-x-6 hidden xsm:flex">
      {items.map((item, index) => (
        <NavigationMenuItem
          key={index}
          label={item.label}
          link={item.link}
          active={item.active}
        />
      ))}
    </div>
  );
};

NavigationMenu.defaultProps = {
  items: [{ label: "Home", link: "/home", active: true }],
};

export default NavigationMenu;
