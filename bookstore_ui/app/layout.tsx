import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
