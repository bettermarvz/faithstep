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
    <div className="w-screen h-screen border flex justify-between items-center snap-start p-10">
      <p className="px-10 h-2/3 w-full text-2xl">{message}</p>
    </div>
  );
};

export default GratitudeCardMobile;
