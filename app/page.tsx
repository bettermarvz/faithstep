"use client";

import { getVerse } from "@/features/bible/api";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { useEffect, useState } from "react";

const Home = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
  const [verseText, setVerseText] = useState("");
  useEffect(() => {
    const fetchVerse = async () => {
      const res = await getVerse(book, chapter, verseNumber);
      setVerseText(res.data.text);
    };
    fetchVerse();
    return () => {};
  }, []);

  return (
    <>
      <DailyStepCard
        text={verseText}
        book={book}
        chapter={chapter}
        verse={verseNumber}
      />
    </>
  );
};

export default Home;
