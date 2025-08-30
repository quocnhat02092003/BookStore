import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { bookCategories } from "@/data/book_categories";
import BookCardProduct from "./BookCardProduct";

const DealOfWeek = () => {
  return (
    <div className="text-center w-full mb-20">
      <h1 className="text-6xl max-lg:text-3xl font-bold">DEALS OF THE WEEK</h1>
      <h3 className="text-xl mt-4">
        Get the best deals on your favorite books!
      </h3>
      <div className="max-xl:mx-4 xl:mx-24 mt-14">
        <Carousel className="w-full mx-auto max-xl:max-w-3xl py-8 px-6 rounded-3xl my-6 bg-cyan-100">
          <CarouselContent className="ml-1 max-lg:ml-14">
            {bookCategories.map((category, index) => (
              <CarouselItem
                className="basis-1/4 max-xl:basis-1/2 max-md:basis-1/1 gap-4 p-8"
                key={category.id}
              >
                <BookCardProduct />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" bg-blue-200 cursor-pointer hover:bg-blue-400 ml-8" />
          <CarouselNext className=" bg-green-200 cursor-pointer hover:bg-green-400 mr-8" />
        </Carousel>
      </div>
    </div>
  );
};

export default DealOfWeek;
