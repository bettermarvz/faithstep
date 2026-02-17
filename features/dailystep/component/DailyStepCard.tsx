import ShareButton from "@/components/global/ShareBtn";
import { Button } from "@/components/ui/button";
import { today } from "@/lib/utils";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const DailyStepCard = ({
  text,
  book,
  chapter,
  verse,
}: {
  text?: string;
  book: string;
  chapter: number;
  verse: number;
}) => {
  const passage = `${book} ${chapter}:${verse}`;
  return (
    <div className="flex flex-col bg-secondary-500 text-white p-6 gap-5 rounded-2xl drop-shadow-xl justify-between">
      <div className="flex justify-between min-h-[56px]">
        <h1 className="font-bold text-2xl">Daily Step</h1>
        {/* <p>{today()}</p> */}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-light">
          {text || (
            <>
              “For God so loved the world, that he gave his only begotten Son,
              that whosoever believeth in him should not perish, but have
              everlasting life”
            </>
          )}
        </p>
        <p>- {passage ?? "John 3:16"} ASV</p>
      </div>
      <div className="flex justify-end gap-4">
        <ShareButton book={book} chapter={chapter} verse={verse} text={text} />
        <Link href={`/bible?book=${book}&chapter=${chapter}`}>
          <Button variant="primary">Read full chapter</Button>
        </Link>
      </div>
    </div>
  );
};

export default DailyStepCard;
