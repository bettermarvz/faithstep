"use client";

import { getVerse } from "@/features/bible/api";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import React, { useEffect, useState } from "react";

const Meta = () => {
  const { book, chapter, verse: verseNumber } = getDailyVerse();
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
      <meta
        property="og:title"
        content="Your daily step to faith from FaithStep app"
      />
      <meta property="og:description" content={verse} />
      {/* <meta property="og:type" content="video.movie" /> */}
      {/* <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" /> */}
      {/* <meta
        property="og:image"
        content="https://ia.media-imdb.com/images/rock.jpg"
      /> */}
    </>
  );
};

export default Meta;
