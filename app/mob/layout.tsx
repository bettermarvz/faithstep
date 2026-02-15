import MobileNavBar from "@/features/navigation/components/MobileNavBar";
import React from "react";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] w-screen relative">
      {children}
      <MobileNavBar className="absolute bottom-0 z-10 flex justify-around items-center bg-white w-full h-14" />
    </div>
  );
};

export default MobileLayout;
