"use client";
import Banner from "@/components/features/home/Banner";
import BigDiscount from "@/components/features/home/BigDiscount";
import BookCollections from "@/components/features/home/BookCollections";
import CategoryHome from "@/components/features/home/CategoryHome";
import DealOfWeek from "@/components/features/home/DealOfWeek";
import DescriptionAndDiscount from "@/components/features/home/DescriptionAndDiscount";
import ExploreOurHome from "@/components/features/home/ExploreOurHome";
import FeedBack from "@/components/features/home/FeedBack";
import TopAuthor from "@/components/features/home/TopAuthor";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "BookStoreX - Buy Books Online";
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Banner />
      <CategoryHome />
      <DealOfWeek />
      <DescriptionAndDiscount />
      <BookCollections />
      <BigDiscount />
      <ExploreOurHome />
      <TopAuthor />
      <FeedBack />
    </div>
  );
}
