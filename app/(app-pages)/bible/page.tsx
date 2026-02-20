/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getChapter } from "@/features/bible/api";
import { books } from "@/features/bible/books";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const BiblePage = ({ params }: { params?: any }) => {
  const DEFAULT_PASSAGE = {
    book: "Genesis",
    chapter: 1,
  };

  const [version, setVersion] = useState("en-asv");
  const [chapter, setChapter] = useState(
    Number(params?.get("chapter") ?? DEFAULT_PASSAGE.chapter),
  );
  const [count, setCount] = useState(0);
  const [verses, setVerses] = useState<any>(null);
  const [book, setBook] = useState(params?.get("book") ?? DEFAULT_PASSAGE.book);

  useEffect(() => {
    const fetchData = async () => {
      const { data, chapters } = await getChapter(version, book, chapter);
      setVerses(data.data);
      setCount(chapters);
    };
    fetchData();
  }, [version, chapter, book]);


  return (
    <div className="px-8 w-full">
      <div className="flex gap-4 text-xl py-5 flex-col w-full xsm:flex-row">
        <select
          onChange={(e) => setVersion(e.currentTarget.value)}
          className="border p-2 rounded-sm"
        >
          <option value="en-asv">ASV</option>
          <option value="en-rv">KJV</option>
        </select>

        <select
          onChange={(e) => setBook(e.currentTarget.value)}
          className="border p-2 rounded-sm"
        >
          {books.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setChapter(Number(e.currentTarget.value))}
          className="border p-2 rounded-sm"
        >
          {[...Array(count).keys()].map((i) => (
            <option
              key={i}
              value={i + 1}
              selected={i + 1 === Number(params?.get("chapter"))}
            >
              Chapter {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full text-center py-5 mt-10">
        <h1 className="text-2xl font-bold">{book}</h1>
      </div>
      <div className="w-full mt-4">
        {verses?.map((item: any) => (
          <p
            className="text-xl hover:bg-blend-hard-light hover:bg-primary-500/10 py-2 px-3"
            key={`${item.chapter}-${item.verse}`}
          >
            <sup className="font-bold text-zinc-500">{item.verse}</sup>&nbsp;
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

const BiblePageWrapper = () => {
  const params = useSearchParams();
  return <BiblePage params={params} />;
};

const BiblePageContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BiblePageWrapper />
    </Suspense>
  );
};

export default BiblePageContainer;
