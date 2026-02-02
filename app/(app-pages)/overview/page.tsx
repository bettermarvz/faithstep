"use client";

import { getVerse } from "@/features/bible/api";
import DailyChallengeCard from "@/features/dailychallenge/component/DailyChallengeCard";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { useGratitude } from "@/features/gratitudes/api";
import GratitudeCard from "@/features/gratitudes/components/GratitudeCard";
import { formatThisDate } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Overview = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
  const { data: gratitude, isLoading } = useGratitude(3);
  const [verse, setVerse] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const res = await getVerse(book, chapter, verseNumber);
      console.log(res);
      setVerse(res.data.text);
      return res;
    };
    fetch();

    return () => {};
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <div className="w-[65%] flex-1">
          <DailyChallengeCard />
        </div>
        <div className="w-[35%]">
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

        <div className="flex gap-4 w-full">
          {/* w-full flex flex-col items-center gap-10 mt-[115px] */}
          {gratitude?.map((item) => (
            <GratitudeCard
              key={item.id}
              name={
                item.isanonymous
                  ? item.user_profiles.anonymous_username
                  : item.user_profiles.displayname
              }
              message={item.content}
              timePosted={formatThisDate(item.createdat)}
              reactions={12}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Overview;
