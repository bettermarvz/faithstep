import React from "react";
import NavigationMenu from "./NavigationMenu";
import NavigationLogo from "./NavigationLogo";
import Notification from "./Notification";
import { MenuItem } from "../type";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/api";
import { useRouter } from "next/navigation";
import Avatar from "@/components/global/Avatar";

const NavigationBar = ({
  menuItems,
  user,
}: {
  menuItems: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}) => {
  const route = useRouter();

  console.log("users details 1111111111:", user?.displayName);
  return (
    <header className="flex justify-between items-center px-8 py-5 rounded-full bg-white drop-shadow-lg mb-5">
      <div className="flex space-x-[46px] items-center">
        <NavigationLogo />
        <NavigationMenu items={menuItems} />
      </div>
      <div className="flex gap-4">
        <Notification />
        <Avatar label={user?.displayName} />
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
