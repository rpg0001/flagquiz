import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "flag quiz :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className + " h-full w-full"}>
        <header>
          <NavBar />
        </header>
        <main className="flex h-2/3 flex-col items-center content-between p-12">
          {children}
        </main>
      </body>
    </html>
  );
}
