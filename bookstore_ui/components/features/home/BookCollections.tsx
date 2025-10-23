"use client";
import React from "react";
import BookCardProduct from "../../card/BookCardProduct";
import { Button } from "../../ui/button";
import { bookCollectionNewArrivals } from "@/data/book_collection/book_collection_new-arrival";
import { bookCollectionBestSellers } from "@/data/book_collection/book_collection_best-seller";
import { bookCollectionFeatured } from "@/data/book_collection/book_collection_featured";
import { AnimatePresence, motion } from "motion/react";

const BookCollections = () => {
  const [activeTab, setActiveTab] = React.useState<string>("New Arrival");

  const collections: Record<string, typeof bookCollectionNewArrivals> = {
    "New Arrival": bookCollectionNewArrivals,
    "Best Seller": bookCollectionBestSellers,
    Featured: bookCollectionFeatured,
  };

  const activeBooks = collections[activeTab] || [];

  return (
    <div className="text-center w-full mb-20 mt-20">
      <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
        BOOK COLLECTIONS
      </h1>
      <h3 className="text-xl max-lg:text-lg mt-4">
        Explore our handpicked selections ranging from timeless literature to{" "}
        <br />
        contemporary bestsellers across diverse genres.
      </h3>
      <div className="flex flex-wrap gap-2 justify-center mt-5">
        <Button
          className={`${
            activeTab === "New Arrival" && "bg-blue-500 text-white"
          }`}
          onClick={() => setActiveTab("New Arrival")}
        >
          New Arrival
        </Button>
        <Button
          className={`${
            activeTab === "Best Seller" && "bg-blue-500 text-white"
          }`}
          onClick={() => setActiveTab("Best Seller")}
        >
          Best Seller
        </Button>
        <Button
          className={`${activeTab === "Featured" && "bg-blue-500 text-white"}`}
          onClick={() => setActiveTab("Featured")}
        >
          Featured
        </Button>
      </div>
      <div className="xl:px-50 lg:px-20 md:px-20 sm:px-20 px-10 mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10"
          >
            {activeBooks.slice(0, 8).map((book) => (
              <BookCardProduct
                key={book.work_id}
                authors={book.author_name}
                coverImageId={book.cover}
                price={book.price}
                title={book.title}
                work_id={book.work_id}
                first_publish_year={book.first_publish_year}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Button size="lg" className="mt-10">
        Explore All
      </Button>
    </div>
  );
};

export default BookCollections;
