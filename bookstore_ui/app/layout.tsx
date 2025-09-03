import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import ShipDetailHome from "@/components/features/home/ShipDetailHome";

// Import font
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "w-screen"}>
        <Header />
        <main className="pt-16">{children}</main>
        <ShipDetailHome />
        <Footer />
      </body>
    </html>
  );
}
