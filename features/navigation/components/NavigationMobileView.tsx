"use client";

import Link from "next/link";
import React from "react";
import { useMenu } from "@/features/providers/MenuProvider";

const NavigationMobileView = () => {
  const { isMenuOpen, closeMenu } = useMenu();

  if (!isMenuOpen) return null;

  return (
    <div className=" rounded-2xl p-4 shadow-lg absolute bg-white top-0 w-full h-screen z-50">
      <ul className="space-y-2">
        <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Link href="/overview" onClick={closeMenu}>
            Overview
          </Link>
        </li>
        <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Link href="/challenges" onClick={closeMenu}>
            Challenges
          </Link>
        </li>
        <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Link href="/gratitude" onClick={closeMenu}>
            Gratitude
          </Link>
        </li>
        <li className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Link href="/bible" onClick={closeMenu}>
            Bible
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMobileView;
