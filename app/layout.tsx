import { Fredoka } from "next/font/google";
import "./globals.css";
import Metadata from "@/components/Metadata";
import StoreProvider from "./StoreProvider";
import NavBar from "@/components/NavBar";
import AppLayout from "./Layout/AppLayout";

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
          <AppLayout>
            <div className="mt-[6rem]">
              <NavBar />
              {children}
            </div>
          </AppLayout>
        </body>
      </html>
    </StoreProvider>
  );
}
