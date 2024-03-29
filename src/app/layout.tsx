import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FeaturedPost,  Header } from "@/constant";
import TanstackProvider from "@/Provider/TanstackProvider";
// import TanstackProvider from '@/Provider/TanstackProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogNest",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
        <Header/>
        <FeaturedPost/>
        {children}
        </TanstackProvider>
        </body>
    </html>
  );
}
