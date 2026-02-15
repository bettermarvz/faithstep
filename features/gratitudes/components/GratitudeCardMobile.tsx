import Avatar from "@/components/global/Avatar";
import { Heart, ThumbsUp } from "lucide-react";
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
    <div className="w-screen h-full border flex justify-between items-center snap-start relative">
      <p className="px-10 h-2/3 w-full text-2xl">{message}</p>
      <div className="absolute bottom-0 p-4 flex justify-between items-center w-full">
        <span className="flex items-center gap-2">
          <Avatar label={name} />
          <div className="flex flex-col">
            <p className="font-semibold">{name}</p>
            <p className="text-sm">{timePosted}</p>
          </div>
        </span>
        <div className="flex flex-col gap-4 mt-2">
          <button
            onClick={() => handleReact(id, "heart")}
            className={`flex flex-col justify-center items-center gap-0`}
          >
            <Heart
              size={32}
              strokeWidth={1.5}
              className={`${isDidReactHeart ? "fill-red-400" : ""}`}
            />
            <p className="text-sm">{hearts}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GratitudeCardMobile;
