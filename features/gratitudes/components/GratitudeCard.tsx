/* eslint-disable no-unused-vars */
import Avatar from "@/components/global/Avatar";
import { LucideHeart, ThumbsUp } from "lucide-react";
import React from "react";

const GratitudeCard = ({
  id,
  name = "",
  timePosted = "",
  message = "",
  // reactions = 0,
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
  // reactions?: number;
  isDidReactHeart?: boolean;
  isDidReactLike?: boolean;
  handleReact: (
    gratitude_id: string,
    type: "heart" | "cared" | "like" | "prayed" | "celebrate",
  ) => void;
  likes: number;
  hearts: number;
}) => {

  const [isLiked, setIsLiked] = React.useState(isDidReactLike);
  const [isHeart, setIsHeart] = React.useState(isDidReactHeart);
  const [currentLikes, setCurrentLikes] = React.useState(likes || 0);
  const [currentHearts, setCurrentHearts] = React.useState(hearts || 0);

  const handleLike = () => {
    if (isLiked) {
      setCurrentLikes((prev) => prev - 1);
    } else {
      setCurrentLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
    handleReact(id, "like");
  };

  const handleHeart = () => {
    if (isHeart) {
      setCurrentHearts((prev) => prev - 1);
    } else {
      setCurrentHearts((prev) => prev + 1);
    }
    setIsHeart(!isHeart);
    handleReact(id, "heart");
  };
  return (
    <div className="bg-white rounded-[16px] p-3 flex flex-col gap-[10px] shadow-md w-full xsm:min-w-[380px] justify-between xsm:w-1/3 min-h-[195px]">
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
      <div className="px-2 text-[12px] flex items-center gap-2 justify-end">
        <>
          <button className="cursor-pointer" onClick={() => handleHeart()}>
            <LucideHeart
              width={16}
              color={isHeart ? "red" : "black"}
              // className={isDidReact ? "bg-red-500" : ""}
            />
          </button>{" "}
          {currentHearts || "0"}
        </>
        <>
          <button className="cursor-pointer" onClick={() => handleLike()}>
            <ThumbsUp
              width={16}
              color={isLiked ? "red" : "black"}
              // className={isDidReact ? "bg-red-500" : ""}
            />
          </button>{" "}
          {currentLikes || "0"}
        </>
      </div>
    </div>
  );
};

export default GratitudeCard;
