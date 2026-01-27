/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NavigationBar from "@/features/navigation/components/NavigationBar";
import UserProvider from "@/features/providers/UserProvider";
import { getCurrentUser } from "@/lib/getUser";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const MenuItem = [
  {
    label: "Overview",
    link: "/overview",
    active: false,
  },
  {
    label: "Challenges",
    link: "/challenges",
    active: false,
  },
  {
    label: "Gratitude",
    link: "/gratitude",
    active: false,
  },
  {
    label: "Bible",
    link: "/bible",
    active: false,
  },
];

const AppPagesLayout = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const { user } = await getCurrentUser();
      setUser(user?.user_metadata);
    };
    fetch();
    return () => {};
  }, []);

  const currentPath = usePathname();

  // Update active state based on current path
  MenuItem.forEach((item) => {
    item.active = item.link === currentPath;
  });
  return (
    <UserProvider user={user}>
      <div>
        <NavigationBar menuItems={MenuItem} user={user} />
        {children}
      </div>
    </UserProvider>
  );
};

export default AppPagesLayout;
