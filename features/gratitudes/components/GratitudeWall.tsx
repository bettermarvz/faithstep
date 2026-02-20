/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from "react";
import GratitudeCard from "./GratitudeCard";
import { formatThisDate } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import GratitudeCardMobile from "./GratitudeCardMobile";

const GratitudeWall = ({
  gratitudes,
  currentUser,
  handleReact,
}: {
  gratitudes: any;
  currentUser: User | null;
  handleReact: (
    gratitude_id: string,
    type: "heart" | "cared" | "like" | "prayed" | "celebrate",
  ) => void;
}) => {
  return (
    <>
      <div className="hidden xsm:grid xsm:grid-cols-3 gap-5 mb-52">
        {gratitudes?.map((item: any) => (
          <GratitudeCard
            handleReact={handleReact}
            key={item.id}
            id={item.id}
            name={
              item.isanonymous
                ? item.user_profiles.anonymous_username
                : item.user_profiles.displayname
            }
            message={item.content}
            timePosted={formatThisDate(item.createdat)}
            hearts={item.hearts}
            likes={item.likes}
            isDidReactHeart={item?.reactions?.find(
              (item: any) =>
                item.user_id === currentUser?.id && item.reaction === "heart",
            )}
            isDidReactLike={item?.reactions?.find(
              (item: any) =>
                item.user_id === currentUser?.id && item.reaction === "like",
            )}
          />
        ))}
      </div>
      <div className="xsm:hidden h-[100dvh] overflow-y-auto snap-y snap-mandatory">
        {gratitudes?.map((item: any) => (
          <GratitudeCardMobile
            handleReact={handleReact}
            key={item.id}
            id={item.id}
            name={
              item.isanonymous
                ? item.user_profiles.anonymous_username
                : item.user_profiles.displayname
            }
            message={item.content}
            timePosted={formatThisDate(item.createdat)}
            hearts={item.hearts}
            likes={item.likes}
            isDidReactHeart={item?.reactions?.find(
              (item: any) =>
                item.user_id === currentUser?.id && item.reaction === "heart",
            )}
            isDidReactLike={item?.reactions?.find(
              (item: any) =>
                item.user_id === currentUser?.id && item.reaction === "like",
            )}
          />
        ))}
      </div>
    </>
  );
};

export default memo(GratitudeWall);
