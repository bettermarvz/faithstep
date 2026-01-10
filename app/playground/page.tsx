import NavigationBar from "@/features/navigation/component/NavigationBar";
import NavigationMenu from "@/features/navigation/component/NavigationMenu";
import ProfileMenu from "@/features/navigation/component/ProfileMenu";
import React from "react";

const MenuItem = [
  {
    label: "Home",
    link: "/home",
    active: false,
  },
  {
    label: "About",
    link: "/about",
    active: true,
  },
  {
    label: "Contact",
    link: "/contact",
    active: false,
  },
];

const PlayGroundPage = () => {
  return (
    <section>
      <NavigationBar />
    </section>
  );
};

export default PlayGroundPage;
