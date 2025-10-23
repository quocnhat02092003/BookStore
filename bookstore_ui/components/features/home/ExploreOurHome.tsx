import React from "react";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import BookCardProduct_v2 from "../../card/BookCardProduct_v2";
import { bookCollectionExploreKidBook } from "@/data/book_collection/book_collection_explore_kid_book";

const ExploreOurHome = () => {
  return (
    <div className="bg-gradient-to-b from-blue-300 via-slate-100 to-white py-10 w-full">
      <div className="lg:flex flex-row justify-around items-center gap-10 my-20 mx-10 max-lg:space-y-5">
        <h2 className="text-7xl max-lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
          Explore Our Kids' Books
        </h2>
        <Button size="lg">
          Explore All <ChevronRight />
        </Button>
      </div>
      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 lg:gap-20 max-lg:justify-center max-lg:items-center gap-5 lg:px-20 mb-20">
        {bookCollectionExploreKidBook.slice(0, 6).map((book) => (
          <BookCardProduct_v2
            key={book.work_id}
            coverImageId={book.cover}
            title={book.title}
            authors={book.author_name}
            price={book.price}
            first_publish_year={book.first_publish_year}
            work_id={book.work_id}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreOurHome;
