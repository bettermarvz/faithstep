"use client";

import React from "react";
import NavigationMenu from "./NavigationMenu";
import NavigationLogo from "./NavigationLogo";
import Notification from "./Notification";
import { MenuItem } from "../type";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/api";
import { useRouter } from "next/navigation";
import Avatar from "@/components/global/Avatar";
import { useMenu } from "@/features/providers/MenuProvider";

const NavigationBar = ({
  menuItems,
  user,
}: {
  menuItems: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}) => {
  const route = useRouter();
  const { toggleMenu } = useMenu();

  return (
    <header className="flex justify-between items-center px-8 py-5 rounded-full bg-white drop-shadow-lg mb-5 ">
      <div className="flex space-x-[46px] w-full justify-between xsm:justify-normal xsm:w-auto items-center">
        <NavigationLogo />
        <NavigationMenu items={menuItems} />
      </div>
      <div className="hidden xsm:flex gap-4">
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
      <button
        onClick={toggleMenu}
        className="xsm:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>
    </header>
  );
};

export default NavigationBar;
