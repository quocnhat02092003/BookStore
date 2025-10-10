"use client";
import React from "react";
import BookCardProduct from "../../card/BookCardProduct";
import { Button } from "../../ui/button";
import { bookCollectionNewArrivals } from "@/data/book_collection/book_collection_new-arrival";
import { bookCollectionBestSellers } from "@/data/book_collection/book_collection_best-seller";
import { bookCollectionFeatured } from "@/data/book_collection/book_collection_featured";

const BookCollections = () => {
  const [activeTab, setActiveTab] = React.useState<string>("New Arrival");

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
      <div className="flex gap-2 justify-center mt-5">
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
      {activeTab === "New Arrival" && (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center xl:px-60 lg:px-40 md:px-20 mt-10 px-10">
          {bookCollectionNewArrivals.slice(0, 8).map((book) => (
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
        </div>
      )}
      {activeTab === "Best Seller" && (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center xl:px-60 lg:px-40 md:px-20 mt-10 px-10">
          {bookCollectionBestSellers.slice(0, 8).map((book) => (
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
        </div>
      )}
      {activeTab === "Featured" && (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center xl:px-60 lg:px-40 md:px-20 mt-10 px-10">
          {bookCollectionFeatured.slice(0, 8).map((book) => (
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
        </div>
      )}
      <Button size="lg" className="mt-10">
        Explore All
      </Button>
    </div>
  );
};

export default BookCollections;
