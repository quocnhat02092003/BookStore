import React from "react";
import AuthorCard from "../../card/AuthorCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const TopAuthor = () => {
  return (
    <div className="text-center w-full my-20 bg-green-950 text-white lg:p-20 max-lg:p-10">
      <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
        Top Authors
      </h1>
      <h3 className="text-xl max-lg:text-lg mt-4">
        Main duplicate opacity invite clip selection subtract selection. <br />
        Follower overflow device ipsum scale shadow.
      </h3>
      <div className="mx-10 mt-10">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="py-10"
          style={{
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <AuthorCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopAuthor;
