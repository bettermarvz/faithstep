import Image from "next/image";
import React from "react";

const ProfileMenu = ({ url }: { url: string }) => {
  if (!url) {
    return <></>;
  }
  return <Image src={url} alt="Profile Menu" width={42} height={42} />;
};

// default properties here
const defaultProps = {
  url: "/mock-profile.svg",
};

ProfileMenu.defaultProps = defaultProps;

export default ProfileMenu;
