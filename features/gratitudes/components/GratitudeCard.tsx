import Avatar from "@/components/global/Avatar";
import { Heart, HeartIcon, LucideHeart, ThumbsUp } from "lucide-react";
import React from "react";

const GratitudeCard = ({
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
    <div className="bg-white rounded-[16px] p-3 flex flex-col gap-[10px] shadow-md min-w-[380px] justify-between w-1/3 min-h-[195px]">
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
        <>
          <button onClick={() => handleReact(id, "heart")}>
            <LucideHeart
              color={isDidReactHeart ? "red" : "black"}
              // className={isDidReact ? "bg-red-500" : ""}
            />
          </button>{" "}
          {hearts || "0"}
        </>
        <>
          <button onClick={() => handleReact(id, "like")}>
            <ThumbsUp
              color={isDidReactLike ? "red" : "black"}
              // className={isDidReact ? "bg-red-500" : ""}
            />
          </button>{" "}
          {likes || "0"}
        </>
      </div>
    </div>
  );
};

export default GratitudeCard;
