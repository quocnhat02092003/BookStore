import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { dataBannerHome } from "@/data/data_banner_home";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  return (
    <div className="w-full pt-16">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full py-16 bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/670f8f7633fbee26a9cb29cf_image%20(2).png')]"
      >
        <CarouselContent>
          {dataBannerHome.map((item) => (
            <CarouselItem key={item.id}>
              <div className="lg:flex flex-row items-center justify-around text-white px-28 gap-40 max-lg:px-14">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                  <p className="text-lg max-lg:text-md">{item.description}</p>
                  <Button
                    variant="default"
                    className="mt-8 w-fit cursor-pointer max-lg:mb-20"
                  >
                    Explore Now <ChevronRight />
                  </Button>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[300px] mt-4 max-lg:mx-auto"
                  style={{
                    animation: "translateImageY 2000ms infinite",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
