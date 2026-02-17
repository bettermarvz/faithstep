import Avatar from "@/components/global/Avatar";
import { LogOut } from "lucide-react";
import React from "react";

const ProfileMobile = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="p-4 bg-white flex gap-4 rounded-sm">
        <Avatar label="Marvin Zarate" className="w-24 h-24" />
      </div>
      <div className="p-4 bg-white flex gap-4  rounded-sm">
        <LogOut />
        Log out
      </div>
    </div>
  );
};

export default ProfileMobile;
