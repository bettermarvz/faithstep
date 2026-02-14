import Avatar from "@/components/global/Avatar";
import React from "react";

const GratitudeCardMobile = ({
  id,
  name = "",
  timePosted = "",
  message = "",
  reactions = 0,
  isDidReactHeart = false,
  isDidReactLike = false,
  handleReact,
  likes,
  hearts,
}: {
  id: string;
  name?: string;
  timePosted?: string;
  message?: string;
  reactions?: number;
  isDidReactHeart?: boolean;
  isDidReactLike?: boolean;
  handleReact: (
    gratitude_id: string,
    type: "heart" | "cared" | "like" | "prayed" | "celebrate",
  ) => void;
  likes: number;
  hearts: number;
}) => {
  return (
    <div className="w-screen h-[100dvh] border flex justify-between items-center snap-start bg-red-200 relative">
      <p className="px-10 h-2/3 w-full text-2xl">{message}</p>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-start">
        <span className="flex items-center gap-2">
          <Avatar label={name} />
          <div className="flex flex-col">
            <p className="font-semibold">{name}</p>
            <p className="text-sm">{timePosted}</p>
          </div>
        </span>
      </div>
    </div>
  );
};

export default GratitudeCardMobile;
