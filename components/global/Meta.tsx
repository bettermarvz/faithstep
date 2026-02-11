import { getVerse } from "@/features/bible/api";
import { getDailyVerse } from "@/features/dailystep/getDailyStep";
import { useEffect, useState } from "react";

const Meta = () => {
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

  const verse = verseText;
  return (
    <>
      <meta name="description" content={verse} />
      <meta
        property="og:title"
        content="Your daily step to faith from FaithStep app"
      />
      <meta property="og:description" content={verse} />
      <meta property="og:image" content="" />
      <meta property="og:url" content="https://faithstep.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:title"
        content="Your daily step to faith from FaithStep app"
      />
      <meta name="twitter:description" content={verse} />
    </>
  );
};

export default Meta;
