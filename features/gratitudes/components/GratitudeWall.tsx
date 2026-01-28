/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import GratitudeCard from "./GratitudeCard";

const GratitudeWall = ({ gratitudes }: { gratitudes: any }) => {
  console.log("11111111111111", gratitudes);
  return (
    <div className="grid grid-cols-3 gap-5">
      {gratitudes?.map((item: any) => (
        <GratitudeCard
          key={item.id}
          name={item.user_profiles.displayname}
          message={item.content}
          timePosted="8:24 PM"
          reactions={12}
        />
      ))}

      {/* <GratitudeCard
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
      <GratitudeCard
        name="Samantha Green"
        message="Grateful for the beauty of nature that surrounds us. From the vibrant colors of a sunset to the gentle rustling of leaves, God’s creation never ceases to amaze me. Taking a moment to appreciate the world around me and the peace it brings. 🌅🍃"
        timePosted="3 days ago"
        reactions={5}
      />
      <GratitudeCard
        name="Michael Brown"
        message="Today, I want to express my gratitude for good health. In a world full of uncertainties, being able to wake up each day feeling strong and capable is a true blessing. Thank You, Lord, for the gift of life and the ability to embrace each moment fully. 💪🙏"
        timePosted="Last week"
        reactions={20}
      />
      <GratitudeCard
        name="Emily White"
        message="I’m thankful for the power of forgiveness. Letting go of past hurts and embracing grace has brought so much healing into my life. Grateful for the freedom that comes with forgiveness and the opportunity to start anew. Here’s to living with a heart full of compassion and understanding. 💖🕊️"
        timePosted="Last month"
        reactions={18}
      />
      <GratitudeCard
        name="Chris Martin"
        message="Feeling blessed for the support of my family. Their unwavering love and encouragement have been my anchor through life’s ups and downs. Thank You, God, for the gift of family and the joy they bring to my life every day. 👨‍👩‍👧‍👦❤️"
        timePosted="2 months ago"
        reactions={25}
      /> */}
    </div>
  );
};

export default GratitudeWall;
