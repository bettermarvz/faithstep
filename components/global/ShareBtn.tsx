"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({
  book,
  chapter,
  verse,
  text,
}: {
  book: string;
  chapter: number;
  verse: number;
  text?: string;
}) {
  const share = async () => {
    const url = `http://localhost:3000/bible?book=${book}&chapter=${chapter}&verse=${verse}`;
    console.log(navigator.share, "nnnnn");
    // 1️⃣ Mobile browsers (best experience)
    if (navigator.share) {
      await navigator.share({
        title: "Your daily step to faith from FaithStep app",
        text,
        url,
      });
      return;
    }

    // 2️⃣ Desktop fallback
    await navigator.clipboard.writeText(`${text}\n\n${url}`);
    alert("Verse copied to clipboard 🙏");
  };

  return (
    <button className="cursor-pointer" onClick={share}>
      <Share2 />
    </button>
  );
}
