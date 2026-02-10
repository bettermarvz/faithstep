"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Meta from "@/components/global/Meta";
import NavigationBar from "@/features/navigation/components/NavigationBar";
import { MenuProvider } from "@/features/providers/MenuProvider";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const excludeLayoutRoutes = [
    "/overview",
    "/auth/login",
    "/auth/signup",
    "/challenges",
    "/gratitude",
    "/bible",
  ];
  return (
    <html lang="en">
      <head>
        <title>Your daily step to faith from FaithStep app</title>
        <Meta />
      </head>
      <body
        className={`${inter.className} max-w-[1258px] mx-auto px-3 sm:px-6`}
      >
        {!excludeLayoutRoutes.includes(pathname) && (
          <MenuProvider>
            <NavigationBar
              menuItems={[
                { label: "Home", link: "/", active: true },
                { label: "About", link: "/about" },
              ]}
            />
          </MenuProvider>
        )}
        <main className=" pt-6 flex flex-col gap-8">{children}</main>
      </body>
    </html>
  );
}
