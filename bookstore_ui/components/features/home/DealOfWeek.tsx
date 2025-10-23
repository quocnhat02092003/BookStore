import React from "react";
import { bookCategories } from "@/data/book_categories";
import BookCardProduct from "../../card/BookCardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { bookCollectionDealsOfWeek } from "@/data/book_collection/book_collection_dealofweek";

const DealOfWeek = () => {
  return (
    <>
      {bookCollectionDealsOfWeek && (
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
                1600: { slidesPerView: 4 },
                1280: { slidesPerView: 3 },
                600: { slidesPerView: 2 },
                300: { slidesPerView: 1 },
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
              className="w-full mx-auto max-xl:max-w-3xl py-8 px-6 rounded-3xl my-6"
            >
              {bookCollectionDealsOfWeek.map((book) => (
                <SwiperSlide key={book.work_id} className="gap-4 p-8">
                  <BookCardProduct
                    work_id={book.work_id}
                    authors={book.author_name}
                    title={book.title}
                    price={book.price}
                    coverImageId={book.cover}
                    first_publish_year={book.first_publish_year}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default DealOfWeek;
