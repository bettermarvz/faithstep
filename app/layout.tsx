import {Inter} from "next/font/google";
import "./globals.css";
import Meta from "@/components/global/Meta";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Your daily step to faith from FaithStep app</title>
        <Meta />
      </head>
      <body className={`${inter.className} max-w-[1258px] mx-auto sm:px-6`}>
        <main className=" pt-6 flex flex-col gap-8">{children}</main>
      </body>
    </html>
  );
}
