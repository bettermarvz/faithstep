/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getVerse } from "@/features/bible/api";
import DailyChallengeCard from "@/features/dailychallenge/component/DailyChallengeCard";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { getCurrentUser } from "@/lib/getUser";
import React, { useEffect, useState } from "react";

const HomeMobile = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
  const [verse, setVerse] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const { user } = await getCurrentUser();
      setUser(user?.user_metadata);
    };
    fetch();
    return () => {};
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const res = await getVerse(book, chapter, verseNumber);
      setVerse(res.data.text);
      return res;
    };
    fetch();

    return () => {};
  }, []);

  console.log(user);

  const greetings = () => {
    if (new Date().getHours() < 12) return "Good morning";
    if (new Date().getHours() < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-2 gap-4 flex flex-col pt-10">
      <h1 className="text-xl font-semibold">
        {greetings()}, {user?.displayName.split(" ")[0] ?? "friend"}!
      </h1>
      <DailyStepCard
        text={verse}
        book={book}
        chapter={chapter}
        verse={verseNumber}
      />
      <DailyChallengeCard />
    </div>
  );
};

export default HomeMobile;
