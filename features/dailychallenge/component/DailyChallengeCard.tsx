import { Button } from "@/components/ui/button";
import { today } from "@/lib/utils";
import React from "react";

const DailyChallengeCard = () => {
  return (
    <div className="flex flex-col bg-white drop-shadow-xl  p-6 gap-5 rounded-2xl h-full justify-between">
      <div className="flex justify-between min-h-[56px]">
        <h1 className="font-bold text-2xl text-black/60">
          {`Today's Challenge`}
        </h1>
        <p>{today()}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="text-[32px] font-bold">Pray for someone today</h2>
        <p className="text-2xl font-light">
          Today’s challenge is to pause and pray for someone in your life. Think
          of a person who might need comfort, guidance, or hope, and spend a
          moment speaking their name in prayer.
        </p>
      </div>
      <div className="flex justify-end">
        <Button>Mark as done</Button>
      </div>
    </div>
  );
};

export default DailyChallengeCard;
