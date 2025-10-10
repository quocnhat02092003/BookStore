import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bookCategories } from "@/data/book_categories";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const CategoryHome = () => {
  return (
    <div className="max-2xl:mx-8 2xl:mx-14 my-20">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay, Pagination]}
        className="w-full mx-auto py-20 border border-black rounded-3xl bg-gray-200"
      >
        {bookCategories.map((category, index) => (
          <SwiperSlide className="py-14 px-10" key={category.id}>
            <Link
              href={`/shop/${category.name.toLowerCase()}`}
              className="flex items-center gap-4 "
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryHome;
