/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import GratitudeCard from "./GratitudeCard";

const formatThisDate = (thisDate: string) => {
  const date = new Date(thisDate);

  const formatted = date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");
  return formatted;
};

const GratitudeWall = ({ gratitudes }: { gratitudes: any }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
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
