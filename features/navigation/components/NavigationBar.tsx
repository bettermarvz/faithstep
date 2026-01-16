import React from "react";
import ProfileMenu from "./ProfileMenu";
import NavigationMenu from "./NavigationMenu";
import NavigationLogo from "./NavigationLogo";
import Notification from "./Notification";
import { MenuItem } from "../type";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/api";
import { useRouter } from "next/navigation";

const NavigationBar = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const route = useRouter();
  return (
    <header className="flex justify-between items-center px-8 py-5 rounded-full bg-white drop-shadow-lg mb-5">
      <div className="flex space-x-[46px] items-center">
        <NavigationLogo />
        <NavigationMenu items={menuItems} />
      </div>
      <div className="flex gap-4">
        <Notification />
        <ProfileMenu url="/mock-profile.svg" />
        <Button
          className="cursor-pointer"
          onClick={() => {
            signOut();
            route.push("/auth/login");
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default NavigationBar;
