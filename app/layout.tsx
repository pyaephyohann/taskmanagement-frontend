"use client";

import { Fredoka } from "next/font/google";
import "./globals.css";
import Metadata from "@/components/Metadata";
import StoreProvider from "./StoreProvider";
import NavBar from "@/components/NavBar";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <link rel="icon" href="/favicon.png" />
        <body className={fredoka.className}>
          <Metadata title="Manage Your Tasks" />
          <div className="mt-[6rem]">
            <NavBar />
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
