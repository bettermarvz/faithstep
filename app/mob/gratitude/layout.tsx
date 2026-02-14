import { Pencil } from "lucide-react";
import React from "react";

const GratitudeMobileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" relative h-[100dvh] w-screen">
      <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full z-10">
        <Pencil size={32} strokeWidth={1.75} />
      </div>
      {children}
    </div>
  );
};

export default GratitudeMobileLayout;
