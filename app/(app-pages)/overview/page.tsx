/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getVerse } from "@/features/bible/api";
import DailyChallengeCard from "@/features/dailychallenge/component/DailyChallengeCard";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { reactToGratitude, useGratitude } from "@/features/gratitudes/api";
import GratitudeCard from "@/features/gratitudes/components/GratitudeCard";
import { getCurrentUser } from "@/lib/getUser";
import { formatThisDate } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
  const { data: gratitude, mutateGratitude } = useGratitude(3);
  const [verse, setVerse] = useState("");
  const [me, setMe] = useState<User | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await getVerse(book, chapter, verseNumber);
      setVerse(res.data.text);
      return res;
    };
    fetch();

    return () => {};
  }, []);

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
    await reactToGratitude(gratitude_id, type);
    await mutateGratitude();
  };

  return (
    <>
      <div className="flex flex-col xsm:flex-row gap-5">
        <div className="w-full xsm:w-[65%] flex-1">
          <DailyChallengeCard />
        </div>
        <div className="w-full xsm:w-[35%]">
          <DailyStepCard
            text={verse}
            book={book}
            chapter={chapter}
            verse={verseNumber}
          />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between min-h-[56px]">
          <h1 className="font-bold text-2xl">Recent Gratitude</h1>
          <p>
            <Link href="/gratitude">View all</Link>
          </p>
        </div>

        <div className="flex gap-4 w-full flex-wrap xsm:flex-nowrap">
          {gratitude?.map((item) => {
            // const reactions =
            //   item.hearts +
            //   item.likes +
            //   item.cared +
            //   item.prayed +
            //   item.celebrate;

            return (
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
                    item.user_id === me?.id && item.reaction === "heart",
                )}
                isDidReactLike={item?.reactions?.find(
                  (item: any) =>
                    item.user_id === me?.id && item.reaction === "like",
                )}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Overview;
