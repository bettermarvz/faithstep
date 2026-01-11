import Image from "next/image";
import React from "react";

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

const avatarSize = {
  sm: {
    number: 32,
    string: "w-8 h-8",
  },
  md: {
    number: 42,
    string: "w-10 h-10",
  },
};

const Avatar = ({
  url,
  label = "?",
  size = "md",
}: {
  url?: string;
  label?: string;
  size?: "sm" | "md";
}) => {
  const baseStyle = `rounded-full bg-gray-300 flex items-center justify-center text-white font-bold ${
    avatarSize[size].string
  } ${size === "sm" ? "text-sm" : "text-lg"}`;
  if (!url && !label) {
    return <></>;
  }
  if (!url) {
    return (
      <div
        className={baseStyle}
        style={{ backgroundColor: stringToColor(label) }}
      >
        {label.charAt(0).toUpperCase()}
      </div>
    );
  }
  return (
    <div className={baseStyle}>
      <Image
        src={url}
        alt={label}
        width={avatarSize[size].number}
        height={avatarSize[size].number}
      />
    </div>
  );
};

export default Avatar;
