"use client";

import { getVerse } from "@/features/bible/api";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { useEffect, useState } from "react";

const Home = () => {
  const [verse, setVerse] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const { book, chapter, verse: verseNumber } = getDailyVerse();
      const res = await getVerse(book, chapter, verseNumber);
      console.log(res);
      setVerse(res.data.text);
      return res;
    };
    fetch();
  }, []);

  const { book, chapter, verse: verseNumber } = getDailyVerse();
  return (
    <>
      <DailyStepCard
        text={verse}
        book={book}
        chapter={chapter}
        verse={verseNumber}
      />
    </>
  );
};

export default Home;
