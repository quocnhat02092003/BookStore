"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShipDetailHome from "@/components/features/home/ShipDetailHome";
import React from "react";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Header />
      <main className="pt-16">{children}</main>
      <ShipDetailHome />
      <Footer />
    </UserProvider>
  );
}
