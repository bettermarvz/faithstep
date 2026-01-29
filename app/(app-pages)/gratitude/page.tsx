"use client";

import { getGratitudes, useGratitude } from "@/features/gratitudes/api";
import GratitudeEditor from "@/features/gratitudes/components/GratitudeEditor";
import GratitudeWall from "@/features/gratitudes/components/GratitudeWall";
import React, { Suspense, use } from "react";

const Gratitude = () => {
  // const gratitudes = use(getGratitudes()); // server
  const { data, isLoading } = useGratitude();
  console.log(data, "hahah");

  return (
    <div>
      <div className="w-full flex flex-col items-center gap-10 mt-[115px]">
        <div className="flex justify-center flex-col gap-3">
          <h1 className="text-2xl font-bold text-center">
            Share Your Gratitude 🙏
          </h1>
          <p className="text-[14px] text-center">
            What are you thankful for today?
          </p>
        </div>
        <GratitudeEditor charLimit={280} />
        {isLoading ? (
          <div>Loading All Gratitude</div>
        ) : (
          <GratitudeWall gratitudes={data} />
        )}
      </div>
    </div>
  );
};

export default Gratitude;
