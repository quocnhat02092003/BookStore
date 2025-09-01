import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
import { bookCategories } from "@/data/book_categories";
import BookCardProduct from "../../card/BookCardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const DealOfWeek = () => {
  return (
    <div className="text-center w-full mb-20">
      <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
        DEALS OF THE WEEK
      </h1>
      <h3 className="text-xl mt-4">
        Get the best deals on your favorite books!
      </h3>
      <div className="max-xl:mx-4 xl:mx-24 mt-14">
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            1280: { slidesPerView: 4 },
            1024: { slidesPerView: 2 },
            640: { slidesPerView: 1 },
          }}
          className="w-full mx-auto max-xl:max-w-3xl py-8 px-6 rounded-3xl my-6 bg-cyan-100"
        >
          {bookCategories.map((category) => (
            <SwiperSlide key={category.id} className="gap-4 p-8">
              <BookCardProduct />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DealOfWeek;
