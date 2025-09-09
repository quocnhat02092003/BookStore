import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "BookStore - Buy Books Online" };

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
    <html lang="vi">
      <body className={inter.className + "w-screen"}>{children}</body>
    </html>
  );
}
