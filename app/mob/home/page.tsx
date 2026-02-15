"use client";

import { getVerse } from "@/features/bible/api";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import React, { useEffect, useState } from "react";

const HomeMobile = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
  const [verse, setVerse] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const res = await getVerse(book, chapter, verseNumber);
      setVerse(res.data.text);
      return res;
    };
    fetch();

    return () => {};
  }, []);

  return (
    <div className="p-2">
      <DailyStepCard
        text={verse}
        book={book}
        chapter={chapter}
        verse={verseNumber}
      />
    </div>
  );
};

export default HomeMobile;
