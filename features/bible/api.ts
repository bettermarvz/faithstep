import verses from "./encouraging-verses.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getMaxChapter(book: string) {
  const url = `https://api.github.com/repos/wldeh/bible-api/contents/bibles/en-asv/books/${book}/chapters`;
  const res = await fetch(url);
  const data = await res.json();

  const numbers = data
    .filter(
      (item: any) => item.type === "file" && /^\d+\.json$/.test(item.name),
    )
    .map((item: any) => Number(item.name.replace(".json", "")));

  return Math.max(...numbers);
}

export const getChapter = async (
  version: string,
  book: string,
  chapter: number,
) => {
  const bk = book.toLocaleLowerCase();
  const result = await fetch(
    `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${bk}/chapters/${chapter}.json`,
  );

  if (!result) {
    throw new Error("failed to fetch bible");
  }

  return {
    data: await result.json(),
    chapters: await getMaxChapter(bk),
  };
};

export const getVerse = async (
  book: string,
  chapter: number,
  verse: number,
) => {
  const bk = book.toLocaleLowerCase();
  const result = await fetch(
    `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-asv/books/${bk}/chapters/${chapter}/verses/${verse}.json`,
  );

  if (!result) {
    throw new Error("failed to fetch bible");
  }

  return {
    data: await result.json(),
    chapters: await getMaxChapter(bk),
  };
};
