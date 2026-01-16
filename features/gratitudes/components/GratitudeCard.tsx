import Avatar from "@/components/global/Avatar";
import { Heart } from "lucide-react";
import React from "react";

const GratitudeCard = ({
  name = "",
  timePosted = "",
  message = "",
  reactions = 0,
  isDidReact = false,
}: {
  name?: string;
  timePosted?: string;
  message?: string;
  reactions?: number;
  isDidReact?: boolean;
}) => {
  return (
    <div className="bg-white rounded-[16px] p-3 flex flex-col gap-[10px] shadow-md min-w-[380px] justify-between">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar label={name} size="sm" />
            <p className="text-[14px]">{name}</p>
          </div>
          <p className="text-[12px]">{timePosted}</p>
        </div>
        <p className="flex px-6 text-[14px]">{message}</p>
      </div>
      <div className="px-6 text-[12px] flex items-center gap-1">
        <Heart className={isDidReact ? "bg-red-500" : ""} /> {reactions || ""}
      </div>
    </div>
  );
};

export default GratitudeCard;
