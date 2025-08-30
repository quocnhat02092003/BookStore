import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { bookCategories } from "@/data/book_categories";
import Link from "next/link";

const CategoryHome = () => {
  return (
    <div className="max-2xl:mx-8 2xl:mx-14 my-20">
      <Carousel className="w-full mx-auto max-w-7xl max-lg:max-w-3xl py-16 border border-black rounded-3xl bg-gray-200">
        <CarouselContent className="ml-20 max-lg:ml-14">
          {bookCategories.map((category, index) => (
            <CarouselItem
              className="lg:basis-1/3 md:basis-1/2 pl-1"
              key={category.id}
            >
              <Link
                href={`/categories/${category.name.toLowerCase()}`}
                className="flex items-center gap-4"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={`border border-black p-2 rounded-full ${
                    index % 2 === 0 ? "bg-green-400" : "bg-blue-400"
                  }`}
                />
                <div className="flex flex-col items-start hover:text-blue-700 duration-500">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-lg:hidden ml-8 bg-blue-200 cursor-pointer hover:bg-blue-400" />
        <CarouselNext className="max-lg:hidden mr-8 bg-green-200 cursor-pointer hover:bg-green-400" />
      </Carousel>
    </div>
  );
};

export default CategoryHome;
