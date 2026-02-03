/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import GratitudeCard from "./GratitudeCard";
import { formatThisDate } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

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
    <div className="grid grid-cols-3 gap-5 mb-52">
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
        // <GratitudeCard
        //   key={item.id}
        //   name={
        //     item.isanonymous
        //       ? item.user_profiles.anonymous_username
        //       : item.user_profiles.displayname
        //   }
        //   message={item.content}
        //   timePosted={formatThisDate(item.createdat)}
        //   reactions={12}
        // />
      ))}
    </div>
  );
};

export default GratitudeWall;
