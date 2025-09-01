import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedbackCard from "@/components/card/FeedbackCard";

const FeedBack = () => {
  return (
    <div className="text-center w-full mb-20 mt-20 lg:p-20 max-lg:p-10 bg-[#e6ddd6]">
      <h1 className="text-6xl max-lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-black">
        Readers Feedback
      </h1>
      <h3 className="text-xl max-lg:text-lg mt-4">
        Share your thoughts and shape the future of Bookshop PQN with <br />
        your valuable feedback.
      </h3>
      <div className="mx-10 mt-10 max-lg:mx-3">
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
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <FeedbackCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeedBack;
