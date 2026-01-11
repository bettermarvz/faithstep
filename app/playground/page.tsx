import Avatar from "@/components/global/Avatar";
import GratitudeCard from "@/features/gratitudes/component/GratitudeCard";
import React from "react";

const PlayGroundPage = () => {
  return (
    <section>
      <GratitudeCard />
      <Avatar size="md" label="John Doe" />
      <Avatar label="JD" />
      <Avatar label="Jd" />
      <Avatar label="John Dore" />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar />
      <Avatar label="John D" />
      <Avatar label="John D" />
      <Avatar label="Avatar component example" />
      <Avatar label="component" />
      <Avatar url="/mock-profile.svg" label="Jane Doe" />
    </section>
  );
};

export default PlayGroundPage;
