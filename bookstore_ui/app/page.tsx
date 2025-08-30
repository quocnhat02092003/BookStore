"use client";
import Banner from "@/components/Banner";
import BigDiscount from "@/components/BigDiscount";
import BookCollections from "@/components/BookCollections";
import CategoryHome from "@/components/CategoryHome";
import DealOfWeek from "@/components/DealOfWeek";
import DescriptionAndDiscount from "@/components/DescriptionAndDiscount";
import ExploreOurHome from "@/components/ExploreOurHome";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "BookStoreX - Buy Books Online";
  });

  return (
    <div className="w-full">
      <Banner />
      <CategoryHome />
      <DealOfWeek />
      <DescriptionAndDiscount />
      <BookCollections />
      <BigDiscount />
      <ExploreOurHome />
    </div>
  );
}
