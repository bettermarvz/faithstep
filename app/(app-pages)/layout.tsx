"use client";

import NavigationBar from "@/features/navigation/components/NavigationBar";
import { usePathname } from "next/navigation";
import React from "react";

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
  const currentPath = usePathname();

  // Update active state based on current path
  MenuItem.forEach((item) => {
    item.active = item.link === currentPath;
  });
  return (
    <div>
      <NavigationBar menuItems={MenuItem} />
      {children}
    </div>
  );
};

export default AppPagesLayout;
