"use client";
import BookCardProduct from "@/components/card/BookCardProduct";
import { allBookCollection } from "@/data/book_collection/all_book_collection";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log("slug", slug);
  return (
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 max-sm:grid-cols-1 gap-10 place-items-center max-lg:py-10">
      {allBookCollection
        .filter((book) =>
          book.type
            .map((type) => type.toLowerCase())
            .includes(slug.toLowerCase())
        )
        .map((book) => (
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
  );
};

export default Page;
