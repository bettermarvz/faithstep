"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import Meta from "@/components/global/Meta";
import UserProvider from "@/features/providers/UserProvider";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/getUser";
// import NavigationBar from "@/features/navigation/components/NavigationBar";
// import { MenuProvider } from "@/features/providers/MenuProvider";
// import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      const { user } = await getCurrentUser();
      setUser(user?.user_metadata);
    };
    fetch();
    return () => {};
  }, []);
  // const pathname = usePathname();
  // const excludeLayoutRoutes = [
  //   "/overview",
  //   "/auth/login",
  //   "/auth/signup",
  //   "/challenges",
  //   "/gratitude",
  //   "/bible",
  // ];
  return (
    <html lang="en">
      <head>
        <title>Your daily step to faith from FaithStep app</title>
        <Meta />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${montserrat.className} max-w-[1258px] mx-auto px-0 sm:px-6`}
      >
        {/* {!excludeLayoutRoutes.includes(pathname) && (
          <MenuProvider>
            <NavigationBar
              menuItems={[
                { label: "Home", link: "/", active: true },
                { label: "About", link: "/about" },
              ]}
              user={null}
            />
          </MenuProvider>
        )} */}

        <main className=" xsm:pt-6 flex flex-col gap-8">
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </body>
    </html>
  );
}
