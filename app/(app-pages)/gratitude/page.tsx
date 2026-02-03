"use client";

import { reactToGratitude, useGratitude } from "@/features/gratitudes/api";
import GratitudeEditor from "@/features/gratitudes/components/GratitudeEditor";
import GratitudeWall from "@/features/gratitudes/components/GratitudeWall";
import { getCurrentUser } from "@/lib/getUser";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";

const Gratitude = () => {
  const ref = useRef(null);
  const [visibility, setVisibility] = useState(true);
  const [me, setMe] = useState<User | null>(null);
  useEffect(() => {
    const fetchMe = async () => {
      const me = await getCurrentUser();
      setMe(me.user);
    };
    fetchMe();

    return () => {};
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );
    observer.observe(ref.current);
    return () => {};
    // return observer.disconnect();
  }, []);
  const { data, isLoading, mutateGratitude } = useGratitude();

  const handleReact = async (
    gratitude_id: string,
    type: "heart" | "cared" | "like" | "prayed" | "celebrate",
  ) => {
    console.log("hello", gratitude_id, type);
    await reactToGratitude(gratitude_id, type);
    await mutateGratitude();
  };

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
        <div className="flex justify-center w-full" ref={ref}>
          <GratitudeEditor charLimit={280} />
        </div>
        {isLoading ? (
          <div>Loading All Gratitude</div>
        ) : (
          <GratitudeWall
            gratitudes={data}
            currentUser={me}
            handleReact={handleReact}
          />
        )}
        <div className="flex fixed bottom-0 justify-center w-full mb-5">
          {!visibility && <GratitudeEditor charLimit={280} />}
        </div>
      </div>
    </div>
  );
};

export default Gratitude;
