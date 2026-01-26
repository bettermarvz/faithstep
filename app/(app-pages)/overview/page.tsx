"use client";

import { getVerse } from "@/features/bible/api";
import DailyChallengeCard from "@/features/dailychallenge/component/DailyChallengeCard";
import DailyStepCard from "@/features/dailystep/component/DailyStepCard";
import GratitudeCard from "@/features/gratitudes/components/GratitudeCard";
import React, { useEffect, useState } from "react";

const Overview = () => {

  const [verse, setVerse] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const res = await getVerse("john", 3, 16);
      console.log(res);
      setVerse(res.data.text);
      return res;
    };
    fetch();

    return () => {};
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <div className="w-[65%] flex-1">
          <DailyChallengeCard />
        </div>
        <div className="w-[35%]">
          <DailyStepCard text={verse} />
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between min-h-[56px]">
          <h1 className="font-bold text-2xl">Recent Gratitude</h1>
          <p>January 14, 2026</p>
        </div>

        <div className="flex gap-4">
          {/* make this as gratitude collection component with fetch limit */}
          <GratitudeCard
            name="Marvin Zarate"
            message="Feeling grateful today for God’s faithfulness. Even in the smallest moments, He shows His love in ways I don’t deserve. Thank You, Lord, for Your goodness that carries me through every season. 🙏✨"
            timePosted="8:24 PM"
            reactions={12}
          />
          <GratitudeCard
            name="Alice Johnson"
            message="Today, I’m thankful for the gift of friendship. My friends have been a source of joy, support, and laughter in my life. Grateful for the memories we create together and the love we share. Here’s to many more adventures ahead! 🌟👭"
            timePosted="Yesterday"
            reactions={8}
          />
          <GratitudeCard
            name="David Lee"
            message="I’m incredibly grateful for the opportunity to pursue my passions and dreams. Each day brings new challenges, but also new chances to grow and learn. Thank You, God, for guiding my path and providing the strength to keep moving forward. 🚀💪"
            timePosted="2 days ago"
            reactions={15}
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
