"use client";

import {
  BookPlus,
  House,
  MessageSquareHeart,
  Mountain,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileNavBar = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className={`${className}`}>
      <Link
        href="/home"
        className={`rounded-full p-1 ${pathname === "/home" ? "bg-secondary-500" : ""}`}
      >
        <House />
      </Link>
      <Link
        href="/challenges"
        className={`rounded-full p-1 ${pathname === "/challenges" ? "bg-secondary-500" : ""}`}
      >
        <Mountain />
      </Link>
      <Link
        href="/gratitude"
        className={`rounded-full p-1 ${pathname === "/gratitude" ? "bg-secondary-500" : ""}`}
      >
        <MessageSquareHeart />
      </Link>
      <Link
        href="/bible"
        className={`rounded-full p-1 ${pathname === "/bible" ? "bg-secondary-500" : ""}`}
      >
        <BookPlus />
      </Link>
      <Link
        href="/profile"
        className={`rounded-full p-1 ${pathname === "/profile" ? "bg-secondary-500" : ""}`}
      >
        <User />
      </Link>
    </div>
  );
};

export default MobileNavBar;
