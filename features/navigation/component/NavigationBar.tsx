import React from "react";
import ProfileMenu from "./ProfileMenu";
import NavigationMenu from "./NavigationMenu";
import NavigationLogo from "./NavigationLogo";
import Notification from "./Notification";
import { MenuItem } from "../type";

const NavigationBar = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <header className="flex justify-between items-center px-8 py-5 rounded-full bg-white drop-shadow-lg drop-shadow-gray-100">
      <div className="flex space-x-[46px] items-center">
        <NavigationLogo />
        <NavigationMenu items={menuItems} />
      </div>
      <div className="flex gap-4">
        <Notification />
        <ProfileMenu url="/mock-profile.svg" />
      </div>
    </header>
  );
};

export default NavigationBar;
