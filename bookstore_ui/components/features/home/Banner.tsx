import React from "react";
// import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { dataBannerHome } from "@/data/data_banner_home";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      exit={{ y: 500 }}
      transition={{ duration: 2 }}
    >
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        className="bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/670f8f7633fbee26a9cb29cf_image%20(2).png')]"
      >
        {dataBannerHome.map((item) => (
          <SwiperSlide key={item.id} className="py-20">
            <div className="flex lg:flex-row flex-col items-center justify-around text-white lg:px-28 lg:gap-20 px-10">
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: 100 }}
                transition={{ duration: 2 }}
                className="flex flex-col"
              >
                <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                <p className="text-lg max-lg:text-md">{item.description}</p>
                <Button
                  variant="default"
                  className="mt-8 w-fit cursor-pointer max-lg:mb-20"
                >
                  Explore Now <ChevronRight />
                </Button>
              </motion.div>
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 4 }}
                className="w-80 h-auto"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="mt-4 "
                  style={{
                    animation: "translateImageY 2000ms infinite",
                  }}
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Banner;
