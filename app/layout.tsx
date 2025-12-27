import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { getCurrentAccount } from "@/lib/auth";
import { getCurrentSeasonDetails } from "./actions/season";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hurlung Premier League",
  description: "Hurlung Premier League - HPL",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ SERVER: read JWT & build auth state
  const account = await getCurrentAccount();
  const currentSeason = await getCurrentSeasonDetails();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ pass account to client navbar */}
        <Navbar account={account} season={currentSeason} />

        <Toaster position="top-center" />

        {children}
      </body>
    </html>
  );
}
