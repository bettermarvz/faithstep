import Avatar from "@/components/global/Avatar";
import React from "react";

const ProfileMenu = ({ url }: { url: string }) => {
  return <Avatar url={url} label="Profile Menu" size="md" />;
};

// default properties here
const defaultProps = {
  url: "/mock-profile.svg",
};

ProfileMenu.defaultProps = defaultProps;

export default ProfileMenu;
