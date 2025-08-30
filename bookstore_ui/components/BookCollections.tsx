import React from "react";
import BookCardProduct from "./BookCardProduct";
import { Button } from "./ui/button";

const BookCollections = () => {
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
        <Button>Tab 1</Button>
        <Button>Tab 2</Button>
        <Button>Tab 3</Button>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center xl:px-60 lg:px-40 md:px-20 mt-10">
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
        <BookCardProduct />
      </div>
      <Button size="lg" className="mt-10">
        Explore All
      </Button>
    </div>
  );
};

export default BookCollections;
