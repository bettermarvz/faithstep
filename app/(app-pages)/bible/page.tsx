/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getChapter } from "@/features/bible/api";
import { books } from "@/features/bible/books";
import React, { useEffect, useState } from "react";
import { toLowerCase } from "zod";

const BiblePage = () => {
  const [version, setVersion] = useState("en-asv");
  const [chapter, setChapter] = useState(1);
  const [count, setCount] = useState(0);
  const [verses, setVerses] = useState<any>(null);
  const [book, setBook] = useState("genesis");

  useEffect(() => {
    const fetchData = async () => {
      const { data, chapters } = await getChapter(version, book, chapter);
      setVerses(data.data);
      console.log("chapter data", data, chapters);
      setCount(chapters);
    };
    fetchData();
  }, [version, chapter, book]);

  console.log("current:", verses);

  return (
    <div className="px-8">
      <div className="flex gap-4 text-xl py-5">
        <select
          onChange={(e) => setVersion(e.currentTarget.value)}
          className="border p-2 rounded-sm"
        >
          <option value="en-asv">
            American Standard Version of 1901 [eng] ASV
          </option>
          <option value="en-rv">King James Version</option>
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
            <option key={i} value={i + 1}>
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
            className="text-xl hover:bg-blend-hard-light hover:bg-primary-500/10 py-1 px-3"
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

export default BiblePage;
