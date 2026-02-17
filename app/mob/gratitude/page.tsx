/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { reactToGratitude, useGratitude } from "@/features/gratitudes/api";
import GratitudeCardMobile from "@/features/gratitudes/components/GratitudeCardMobile";
import { getCurrentUser } from "@/lib/getUser";
import { formatThisDate } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const GratitudeMobile = () => {
  const { data, isLoading, mutateGratitude } = useGratitude();
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const me = await getCurrentUser();
      setMe(me.user);
    };
    fetchMe();

    return () => {};
  }, []);

  const handleReact = async (
    gratitude_id: string,
    type: "heart" | "cared" | "like" | "prayed" | "celebrate",
  ) => {
    console.log("hello", gratitude_id, type);
    await reactToGratitude(gratitude_id, type);
    await mutateGratitude();
  };
  return (
    <div className="xsm:hidden h-full overflow-y-auto snap-y snap-mandatory ">
      {data?.map((item: any) => (
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
            (item: any) => item.user_id === me?.id && item.reaction === "heart",
          )}
          isDidReactLike={item?.reactionmes?.find(
            (item: any) => item.user_id === me?.id && item.reaction === "like",
          )}
        />
      ))}
    </div>
  );
};

export default GratitudeMobile;
