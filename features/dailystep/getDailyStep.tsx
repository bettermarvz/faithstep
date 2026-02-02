/* eslint-disable @typescript-eslint/no-explicit-any */
import verses from "../bible/encouraging-verses.json";
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(array: any, seed: number) {
  const rng = mulberry32(seed);
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const getDailyVerse = () => {
  // 1. Seed shuffle once (global seed)
  const SHUFFLE_SEED = 123456;
  const shuffledVerses = shuffleWithSeed(verses, SHUFFLE_SEED);

  // 2. Get today's date string
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 3. Hash date → index
  const dayHash = hashString(today);
  const index = dayHash % shuffledVerses.length;

  return shuffledVerses[index];
};
