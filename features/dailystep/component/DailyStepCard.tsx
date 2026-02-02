import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import React from "react";

const DailyStepCard = ({ text, verse }: { text?: string; verse: string }) => {
  return (
    <div className="flex flex-col bg-primary-900 text-white p-6 gap-5 rounded-2xl drop-shadow-xl justify-between">
      <div className="flex justify-between min-h-[56px]">
        <h1 className="font-bold text-2xl">Daily Step</h1>
        <p>January 14, 2026</p>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-light">
          {text || (
            <>
              “For God so loved the world, that he gave his only begotten Son,
              that whosoever believeth in him should not perish, but have
              everlasting life”
            </>
          )}
        </p>
        <p>- {verse ?? "John 3:16"}</p>
      </div>
      <div className="flex justify-end gap-4">
        <button>
          <Heart />
        </button>
        <button>
          <Share2 />
        </button>
        <Button variant="primary">Read full chapter</Button>
      </div>
    </div>
  );
};

export default DailyStepCard;
