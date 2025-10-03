"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from "notistack";
import React from "react";
import { UserProvider } from "@/context/UserContext";

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
      <body className={inter.className + "w-screen"}>
        <UserProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
