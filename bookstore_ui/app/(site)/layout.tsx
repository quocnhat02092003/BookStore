"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShipDetailHome from "@/components/features/home/ShipDetailHome";
import React from "react";
import { getDataUser } from "@/service/AuthService";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Get data user
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getDataUser();
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <ShipDetailHome />
      <Footer />
    </>
  );
}
