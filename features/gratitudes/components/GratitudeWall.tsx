/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import GratitudeCard from "./GratitudeCard";
import { formatThisDate } from "@/lib/utils";

const GratitudeWall = ({ gratitudes }: { gratitudes: any }) => {
  return (
    <div className="grid grid-cols-3 gap-5 mb-52">
      {gratitudes?.map((item: any) => (
        <GratitudeCard
          key={item.id}
          name={item.user_profiles.displayname}
          message={item.content}
          timePosted={formatThisDate(item.createdat)}
          reactions={12}
        />
      ))}
    </div>
  );
};

export default GratitudeWall;
